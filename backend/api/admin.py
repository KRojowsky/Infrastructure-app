from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from .models import User, Report, ReportImage, ReportLike, ReportComment


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Informacje osobiste', {'fields': ('first_name', 'last_name', 'city', 'office_name', 'avatar', 'area')}),  # dodane area
        ('Role i uprawnienia', {'fields': ('role', 'is_staff', 'is_superuser', 'is_active', 'groups', 'user_permissions')}),
        ('Daty', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'first_name', 'last_name', 'city', 'office_name', 'area'),  # dodane area
        }),
    )
    list_display = ('email', 'username', 'role', 'city', 'office_name', 'area', 'is_staff')  # dodane area
    search_fields = ('email', 'username', 'first_name', 'last_name', 'city', 'office_name', 'area')  # dodane area
    ordering = ('email',)



class ReportImageInline(admin.TabularInline):
    model = ReportImage
    extra = 1
    readonly_fields = ('preview',)

    def preview(self, obj):
        if obj.image:
            return format_html(f'<img src="{obj.image.url}" width="100" style="border-radius:8px;" />')
        return "-"


class ReportLikeInline(admin.TabularInline):
    model = ReportLike
    extra = 0
    readonly_fields = ('user', 'created_at')
    can_delete = False  # lajki nie są edytowalne w adminie


class ReportCommentInline(admin.TabularInline):
    model = ReportComment
    extra = 0
    readonly_fields = ('user', 'content', 'created_at')
    can_delete = True


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'created_at', 'latitude', 'longitude', 'city', 'likes_count', 'comments_count')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'description', 'user__email')
    readonly_fields = ('created_at', 'likes_count', 'comments_count')
    inlines = [ReportImageInline, ReportLikeInline, ReportCommentInline]

    def likes_count(self, obj):
        return obj.likes.count()
    likes_count.short_description = 'Liczba lajków'

    def comments_count(self, obj):
        return obj.comments.count()  # dzięki related_name='comments' w ReportComment
    comments_count.short_description = 'Liczba komentarzy'
