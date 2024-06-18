import datetime
import jwt
from rest_framework import status, viewsets
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from app.models import User, Post, Category, CategoryUser, Comment, Like, Subscription
from app.serializers import UserSerializer, PostSerializer, CategorySerializer, CategoryUserSerializer, \
    CommentSerializer, LikeSerializer, SubSerializer

from django.dispatch import receiver

from django.db.models.signals import post_save, post_delete


class UsersView(APIView):
    def get(self, request, id=None):
        if id is not None:
            user = User.objects.get(pk=id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:

            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

    def post(self, request):
        email = request.data.get('email')
        name = request.data.get('name')

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Пользователь с этим email уже зарегистрирован.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(name=name).exists():
            return Response({'error': 'Пользователь с таким никнеймом уже существует.'},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

    def put(self, request, id):
        action = request.data.get('action')
        user = User.objects.get(id=id)

        if action == 'block':
            user.is_blocked = True
        elif action == 'unblock':
            user.is_blocked = False

        user.save()
        return Response({'message': 'Пользователь успешно обновлен'})

    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
            user.delete()
            return Response({'message': 'Пользователь успешно удален'}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)


class RegistrationAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        name = request.data.get('name')

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Пользователь с этим email уже зарегистрирован.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(name=name).exists():
            return Response({'error': 'Пользователь с таким никнеймом уже существует.'},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('Неправильный email или пароль')
        if not user.check_password(password):
            raise AuthenticationFailed('Неправильный email или пароль')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }

        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)

    def put(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

        user.author_status = True
        user.save()

        return Response({'message': 'Пользователь успешно обновлен'})


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')

        response.data = {
            'message': 'success'
        }
        return response


class PostView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PostViewDetail(APIView):
    def get(self, request, pk):
        """
        Получение постов пользователя по его ID.
        """
        try:
            posts = Post.objects.filter(user_id=pk)
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        """
        Удаление поста по id.
        """
        try:
            post = Post.objects.get(pk=pk)
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        """
        Изменение поста по id.
        """
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, category_id):
        category = Category.objects.get(pk=category_id)
        serializer = CategorySerializer(category, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CategoryViewDetail(APIView):
    def delete(self, request, category_id):
        category = Category.objects.get(pk=category_id)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryUserView(APIView):
    def get(self, request):
        category_users = CategoryUser.objects.all()
        serializer = CategoryUserSerializer(category_users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategoryUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentView(APIView):
    def get(self, request):
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentDetailView(APIView):
    def delete(self, request, comment_id):
        comment = Comment.objects.get(pk=comment_id)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LikeView(APIView):
    def get(self, request):
        likes = Like.objects.all()
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LikeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LikeDetailView(APIView):
    def delete(self, request):
        like_id = request.data.get('like_id')
        like = Like.objects.get(pk=like_id)
        like.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@receiver(post_save, sender=Like)
@receiver(post_delete, sender=Like)
def update_like_count(sender, instance, **kwargs):
    post_id = instance.post_id
    like_count = Like.objects.filter(post_id=post_id).count()
    Post.objects.filter(post_id=post_id).update(like_count=like_count)


class SubscriptionView(APIView):
    def get(self, request):
        subscriptions = Subscription.objects.all()
        serializer = SubSerializer(subscriptions, many=True)
        return Response(serializer.data)

    def post(self, request):
        author_id = request.data.get('author')
        subscriber_id = request.data.get('subscriber')
        serializer = SubSerializer(data=request.data)

        if author_id == subscriber_id:
            return Response({"error": "Author and subscriber cannot be the same."}, status=status.HTTP_400_BAD_REQUEST)

        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SubscriptionDetailView(APIView):
    def delete(self, request):
        sub_id = request.data.get('sub_id')
        subscription = Subscription.objects.get(pk=sub_id)
        subscription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SubscriptionCountView(APIView):
    def get(self, request):
        author_id = request.data.get('author_id')
        subscriber_count = Subscription.objects.filter(author_id=author_id).count()

        return Response({"author_id": author_id, "subscriber_count": subscriber_count})
