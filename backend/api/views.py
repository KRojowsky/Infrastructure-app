from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from .serializers import RegisterSerializer, UserDetailSerializer, ReportSerializer, ReportCommentSerializer
from .models import Report, ReportImage, ReportLike, ReportComment
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser


class MeView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # konieczne dla plików

    def get(self, request):
        serializer = UserDetailSerializer(request.user, context={'request': request})
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserDetailSerializer(
            request.user,
            data=request.data,
            context={'request': request},
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            report = serializer.save(
                user=request.user,
                city=request.user.city
            )

            images = request.FILES.getlist('images')
            for img in images:
                ReportImage.objects.create(report=report, image=img)

            return Response(
                ReportSerializer(report, context={'request': request}).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReportListView(generics.ListAPIView):
    serializer_class = ReportSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user = self.request.user
        queryset = Report.objects.all().order_by('-created_at')

        if not user.is_authenticated:
            return queryset

        if user.role == 'authority':
            return queryset.filter(
                city=user.city,
                category=user.area
            )

        # 🔹 zwykły user (społeczność)
        return queryset


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


class ReportStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, report_id):
        report = get_object_or_404(Report, id=report_id)

        # tylko authority może zmieniać status
        if request.user.role != 'authority':
            return Response({"detail": "Brak uprawnień"}, status=status.HTTP_403_FORBIDDEN)

        new_status = request.data.get('status')
        if new_status not in ['pending', 'in-progress', 'done']:
            return Response({"detail": "Nieprawidłowy status"}, status=status.HTTP_400_BAD_REQUEST)

        report.status = new_status
        report.save()
        return Response({"id": report.id, "status": report.status})


class LatestCommentsByCity(generics.ListAPIView):
    serializer_class = ReportCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        city = user.city
        # 10 ostatnich komentarzy w mieście użytkownika
        return ReportComment.objects.filter(
            report__city=city
        ).order_by('-created_at')[:10]