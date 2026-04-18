from django.shortcuts import render
import json
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Order, OrderItem, OrderFile, SavedDesign
from .serializers import (
    OrderListSerializer,
    OrderDetailSerializer,
    OrderCreateSerializer,
    OrderFileSerializer,
    SavedDesignSerializer,
)
from shop.models import Service


class OrderListCreateView(APIView):
    """
    GET  /api/orders/
    POST /api/orders/
    """
    permission_classes = [IsAuthenticated]
    
    # ADD THIS LINE: Tells Django to accept files and form data!
    parser_classes = [MultiPartParser, FormParser, JSONParser] 

    def get(self, request):
        orders = Order.objects.filter(
            user=request.user
        ).prefetch_related("items__service", "files")

        status_filter = request.query_params.get("status")
        if status_filter and status_filter != "all":
            orders = orders.filter(status=status_filter)

        serializer = OrderListSerializer(orders, many=True)
        return Response(serializer.data)

    @transaction.atomic
    def post(self, request):           
        # THE FIX: Convert QueryDict to a standard Python dictionary so it accepts lists!
        data = dict(request.data.items())

        # Now parse the items string into a real Python list!
        if 'items' in data and isinstance(data['items'], str):
            try:
                data['items'] = json.loads(data['items'])
            except json.JSONDecodeError:
                return Response(
                    {"items": ["Invalid JSON format for items."]},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Pass our normal, parsed dictionary to the serializer
        serializer = OrderCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        validated_data = serializer.validated_data

        total_price = sum(
            item["price_per_unit"] * item["quantity"]
            for item in validated_data["items"]
        ) + validated_data.get("shipping_fee", 0)

        order = Order.objects.create(
            user              = request.user,
            delivery_type     = validated_data["delivery_type"],
            address           = validated_data.get("address", ""),
            payment_method    = validated_data.get("payment_method", "cash"),
            payment_reference = validated_data.get("payment_reference", ""),
            shipping_fee      = validated_data.get("shipping_fee", 0),
            total_price       = total_price,
            admin_notes       = data.get("notes", "") 
        )

        for item_data in validated_data["items"]:
            service = get_object_or_404(Service, slug=item_data["service_slug"])
            OrderItem.objects.create(
                order          = order,
                service        = service,
                quantity       = item_data["quantity"],
                price_per_unit = item_data["price_per_unit"],
                options        = item_data.get("options", {}),
            )
            
        # IMPORTANT: Handle the uploaded design file!
        if "design_file" in request.FILES:
            file = request.FILES["design_file"]
            name = file.name.lower()
            
            if name.endswith(".pdf"):
                file_type = OrderFile.FileType.PDF
            elif name.endswith(".png"):
                file_type = OrderFile.FileType.PNG
            elif name.endswith((".jpg", ".jpeg")):
                file_type = OrderFile.FileType.JPG
            else:
                file_type = OrderFile.FileType.OTHER

            OrderFile.objects.create(
                order     = order,
                file      = file,
                file_name = file.name,
                file_type = file_type,
            )

        return Response(
            OrderDetailSerializer(order).data,
            status=status.HTTP_201_CREATED
        )


class OrderDetailView(APIView):
    """
    GET /api/orders/<order_code>/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, order_code):
        order = get_object_or_404(
            Order,
            order_code=order_code,
            user=request.user
        )
        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)


class OrderCancelView(APIView):
    """
    PATCH /api/orders/<order_code>/cancel/
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, order_code):
        order = get_object_or_404(
            Order,
            order_code=order_code,
            user=request.user
        )

        if not order.can_edit:
            return Response(
                {"error": "Only pending orders can be cancelled."},
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = Order.Status.CANCELLED
        order.save()

        return Response(
            {"message": f"Order {order_code} has been cancelled."},
            status=status.HTTP_200_OK
        )


class OrderFileUploadView(APIView):
    """
    POST /api/orders/<order_code>/upload/
    """
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser]

    def post(self, request, order_code):
        order = get_object_or_404(
            Order,
            order_code=order_code,
            user=request.user
        )

        # ── Debug (remove after testing) ──────────────
        print("FILES received:", request.FILES)
        print("DATA received:", request.data)
        # ──────────────────────────────────────────────

        file = request.FILES.get("file")
        if not file and request.FILES:
            file = list(request.FILES.values())[0]

        if not file:
            return Response(
                {
                    "error":        "No file provided.",
                    "debug_files":  str(request.FILES),
                    "debug_data":   str(request.data),
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        name = file.name.lower()
        if name.endswith(".pdf"):
            file_type = OrderFile.FileType.PDF
        elif name.endswith(".png"):
            file_type = OrderFile.FileType.PNG
        elif name.endswith((".jpg", ".jpeg")):
            file_type = OrderFile.FileType.JPG
        else:
            file_type = OrderFile.FileType.OTHER

        order_file = OrderFile.objects.create(
            order     = order,
            file      = file,
            file_name = file.name,
            file_type = file_type,
        )

        serializer = OrderFileSerializer(order_file)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# ── Saved Designs ─────────────────────────────────────────────────────────────

class SavedDesignListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/orders/designs/
    POST /api/orders/designs/
    """
    serializer_class   = SavedDesignSerializer
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        return SavedDesign.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        file = self.request.FILES.get("file")
        file_size = ""
        if file:
            size_bytes = file.size
            if size_bytes < 1024 * 1024:
                file_size = f"{size_bytes / 1024:.1f} KB"
            else:
                file_size = f"{size_bytes / (1024 * 1024):.1f} MB"

        serializer.save(
            user      = self.request.user,
            file_size = file_size,
        )


class SavedDesignDeleteView(generics.DestroyAPIView):
    """
    DELETE /api/orders/designs/<id>/
    """
    serializer_class   = SavedDesignSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedDesign.objects.filter(user=self.request.user)
    



class OrderStatusView(APIView):
    """
    GET /api/orders/<order_code>/status/
    ← Orders.jsx status badge + timeline
    Returns current status of an order
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, order_code):
        order = get_object_or_404(
            Order,
            order_code=order_code,
            user=request.user
        )

        return Response({
            "order_code":  order.order_code,
            "status":      order.status,
            "can_edit":    order.can_edit,
            "timeline": [
                {
                    "step":      "pending",
                    "label":     "Order Placed",
                    "completed": True,   # always True once order exists
                },
                {
                    "step":      "processing",
                    "label":     "Processing",
                    "completed": order.status in ["processing", "completed"],
                },
                {
                    "step":      "completed",
                    "label":     "Ready / Completed",
                    "completed": order.status == "completed",
                },
            ],
            "created_at":  order.created_at,
            "updated_at":  order.updated_at,
        })


class OrderHistoryView(generics.ListAPIView):
    """
    GET /api/orders/history/
    ← AccountLogin.jsx Order History tab
    Returns all orders for current user
    with optional status filter
    """
    serializer_class   = OrderListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Order.objects.filter(
            user=self.request.user
        ).prefetch_related("items__service", "files")

        status_filter = self.request.query_params.get("status")
        if status_filter and status_filter != "all":
            queryset = queryset.filter(status=status_filter)

        return queryset