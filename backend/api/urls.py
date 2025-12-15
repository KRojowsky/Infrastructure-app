from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MeView, RegisterView, ReportCreateView, ReportListView, UserReportListView, ToggleLikeView, ReportCommentListCreateView

urlpatterns = [
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/me/', MeView.as_view(), name='me'),
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('reports/create/', ReportCreateView.as_view(), name='report_create'),
    path('reports/', ReportListView.as_view(), name='report_list'),
    path('reports/user/', UserReportListView.as_view(), name='user_report_list'),
    path('reports/<int:report_id>/like/', ToggleLikeView.as_view()),
    path('reports/<int:report_id>/comments/', ReportCommentListCreateView.as_view()),
]

