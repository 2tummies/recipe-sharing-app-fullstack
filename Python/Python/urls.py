from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from meal_planner_connection.views import CreateUserView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('meal_planner_connection/user/register/', CreateUserView.as_view(), name='register'),
    path('meal_planner_connection/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('meal_planner_connection/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('meal_planner_connection-auth/', include('rest_framework.urls')),
    path('meal_planner_connection/', include('meal_planner_connection.urls')),
]
