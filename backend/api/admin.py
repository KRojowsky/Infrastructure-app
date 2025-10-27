from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Informacje osobiste', {'fields': ('first_name', 'last_name', 'city', 'office_name')}),
        ('Role i uprawnienia', {'fields': ('role', 'is_staff', 'is_superuser', 'is_active', 'groups', 'user_permissions')}),
        ('Daty', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'first_name', 'last_name', 'city', 'office_name'),
        }),
    )
    list_display = ('email', 'username', 'role', 'city', 'office_name', 'is_staff')
    search_fields = ('email', 'username', 'first_name', 'last_name', 'city', 'office_name')
    ordering = ('email',)
