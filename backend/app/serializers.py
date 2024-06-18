from rest_framework import serializers
from app.models import User, Post, Category, CategoryUser, Comment, Like, Subscription


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'password', 'date_of_birth', 'registration_date', 'author_status',
                  'is_blocked', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post

        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category

        fields = '__all__'


class CategoryUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryUser

        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment

        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like

        fields = '__all__'


class SubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription

        fields = '__all__'
