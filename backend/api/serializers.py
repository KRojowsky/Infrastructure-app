from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from .models import Report, ReportImage, ReportComment, ReportLike


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'role', 'city', 'office_name', 'area', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Hasła nie są takie same."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        username = validated_data.get('username') or validated_data['email']
        user = User.objects.create(
            email=validated_data['email'],
            username=username,
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data['role'],
            city=validated_data.get('city', ''),
            office_name=validated_data.get('office_name', ''),
            area=validated_data.get('area', ''),  # <- tutaj zapisujemy area
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserDetailSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'avatar', 'avatar_url', 'role', 'office_name']  # <-- dodaj email

    def get_avatar_url(self, obj):
        request = self.context.get('request')
        if obj.avatar:
            return request.build_absolute_uri(obj.avatar.url)
        return request.build_absolute_uri(settings.MEDIA_URL + 'avatars/avatar.svg')


class ReportImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ReportImage
        fields = ['id', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class ReportSerializer(serializers.ModelSerializer):
    images = ReportImageSerializer(many=True, read_only=True)
    author_name = serializers.CharField(source='user.get_full_name', read_only=True)
    author_avatar = serializers.SerializerMethodField()
    city = serializers.CharField(source='user.city', read_only=True)

    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    comments_count = serializers.IntegerField(source='comments.count', read_only=True)

    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = [
            'id', 'title', 'description', 'category', 'created_at',
            'latitude', 'longitude',
            'images',
            'author_name', 'author_avatar',
            'city',
            'status', 'priority',
            'likes_count',
            'comments_count',
            'is_liked',
        ]

    def get_author_avatar(self, obj):
        request = self.context.get('request')
        if obj.user.avatar:
            return request.build_absolute_uri(obj.user.avatar.url)
        return request.build_absolute_uri(settings.MEDIA_URL + 'avatars/avatar.svg')

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False


class ReportCommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='user.get_full_name', read_only=True)
    author_avatar = serializers.SerializerMethodField()
    author_role = serializers.CharField(source='user.role', read_only=True)
    office_name = serializers.CharField(source='user.office_name', read_only=True)
    report_id = serializers.IntegerField(source='report.id', read_only=True)
    is_authority = serializers.SerializerMethodField()

    class Meta:
        model = ReportComment
        fields = [
            'id',
            'content',
            'created_at',
            'author_name',
            'author_avatar',
            'author_role',
            'office_name',
            'report_id',
            'is_authority',
        ]

    def get_author_avatar(self, obj):
        request = self.context.get('request')
        if obj.user.avatar:
            return request.build_absolute_uri(obj.user.avatar.url)
        return request.build_absolute_uri('/media/avatars/avatar.svg')

    def get_is_authority(self, obj):
        return obj.user.role == 'authority'