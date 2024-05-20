from rest_framework import serializers
from app.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'name', 'email', 'password', 'date_of_birth', 'registration_date', 'author_status', 'is_blocked', 'is_staff']
