import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from datetime import timedelta
from django.utils import timezone
from statsmodels.tsa.statespace.sarimax import SARIMAXResults

class WeeklyForecastView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):

        # Get the exact folder where this views.py file lives
        current_directory = os.path.dirname(os.path.abspath(__file__))
        
        # Join that folder path with the exact file name
        model_path = os.path.join(current_directory, 'sarimax_model.pkl')
        
        # Quick debug print so you can see it in your terminal
        print("LOADING MODEL FROM:", model_path)
        
        try:
            # Load the trained model
            loaded_model = SARIMAXResults.load(model_path)
            
            # Predict the next 4 weeks
            forecast = loaded_model.get_forecast(steps=4)
            predictions = forecast.predicted_mean
            
            # Format the output
            forecast_data = []
            today = timezone.localtime(timezone.now())
            
            for i, value in enumerate(predictions):
                future_date = today + timedelta(weeks=i+1)
                forecast_data.append({
                    "week": future_date.strftime('%b %d, %Y'), # Formats as "May 12, 2026"
                    "predicted_revenue": round(float(value), 2)
                })

            return Response({
                "status": "success",
                "forecast": forecast_data
            })
            
        except FileNotFoundError:
            return Response(
                {"error": f"Model file still not found at: {model_path}"}, 
                status=500
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred loading the model: {str(e)}"}, 
                status=500
            )