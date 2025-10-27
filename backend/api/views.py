# api/views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        avatar_url = request.user.avatar.url if request.user.avatar else None
        return Response({
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "email": request.user.email,
            "avatar": avatar_url,
        })
