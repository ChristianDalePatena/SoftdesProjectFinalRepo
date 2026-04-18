from rest_framework import serializers
from orders.models import Order
from django.db.models import Sum, Count, Q
from users.models import User
from .models import StoreSettings
from orders.serializers import OrderFileSerializer


class AdminOrderSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='order_code', read_only=True)
    customer = serializers.SerializerMethodField()
    service = serializers.SerializerMethodField()
    date = serializers.DateTimeField(source='created_at', format='%Y-%m-%d', read_only=True)
    total = serializers.DecimalField(source='total_price', max_digits=10, decimal_places=2, read_only=True)
    files = OrderFileSerializer(many=True, read_only=True)
    notes = serializers.CharField(source='admin_notes', allow_blank=True, required=False)



    class Meta:
        model = Order
        fields = ['id', 'customer', 'service', 'date', 'status', 'total', 'files', 'notes']

    def get_customer(self, obj):
        # Fallback to email if full_name wasn't provided during signup
        return obj.user.full_name if obj.user.full_name else obj.user.email

    def get_service(self, obj):
        # Grabs the name of the first service in the order
        first_item = obj.items.first()
        return first_item.service.name if first_item else "Multiple Services"


    

class AdminCustomerSerializer(serializers.ModelSerializer):
    """Formats user data perfectly for the React Customer table"""
    id = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    
    # CHANGED: Added source='total_orders'
    orders = serializers.IntegerField(source='total_orders', read_only=True) 
    
    spent = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    joined = serializers.DateTimeField(source='date_joined', format='%b %d, %Y', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone', 'orders', 'spent', 'joined']

    def get_id(self, obj):
        return f"CUST-{obj.id:03d}"

    def get_name(self, obj):
        return obj.full_name if obj.full_name else obj.username


class StoreSettingsSerializer(serializers.ModelSerializer):
    """Maps Django snake_case to React camelCase"""
    storeName = serializers.CharField(source='store_name')
    contactEmail = serializers.EmailField(source='contact_email')
    contactPhone = serializers.CharField(source='contact_phone')
    emailNotifications = serializers.BooleanField(source='email_notifications')
    smsNotifications = serializers.BooleanField(source='sms_notifications')

    class Meta:
        model = StoreSettings
        fields = ['storeName', 'contactEmail', 'contactPhone', 'emailNotifications', 'smsNotifications']