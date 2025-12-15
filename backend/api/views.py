from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from .serializers import RegisterSerializer, UserDetailSerializer, ReportSerializer, ReportCommentSerializer
from .models import Report, ReportImage, ReportLike, ReportComment
from django.shortcuts import get_object_or_404


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserDetailSerializer(request.user, context={'request': request})
        return Response(serializer.data)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"detail": "Użytkownik utworzony pomyślnie."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReportCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        serializer = ReportSerializer(data=data)
        if serializer.is_valid():
            report = serializer.save(user=request.user)

            # Zapisz zdjęcia
            images = request.FILES.getlist('images')
            for img in images:
                ReportImage.objects.create(report=report, image=img)

            # Zwróć pełne dane raportu (z obrazkami)
            serializer = ReportSerializer(report, context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReportListView(generics.ListAPIView):
    queryset = Report.objects.all().order_by('-created_at')
    serializer_class = ReportSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        return {'request': self.request}


class UserReportListView(generics.ListAPIView):
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Report.objects.filter(user=self.request.user).order_by('-created_at')

    def get_serializer_context(self):
        return {'request': self.request}


class ToggleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, report_id):
        report = get_object_or_404(Report, id=report_id)
        like, created = ReportLike.objects.get_or_create(user=request.user, report=report)
        if not created:
            like.delete()
            return Response({'liked': False})
        return Response({'liked': True})


class ReportCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = ReportCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ReportComment.objects.filter(
            report_id=self.kwargs['report_id']
        ).order_by('created_at')

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            report_id=self.kwargs['report_id']
        )