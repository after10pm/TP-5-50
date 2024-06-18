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
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class UsersViewDetail(APIView):
    """
    Получение, изменение, удаление пользователя по id.
    """

    def get(self, request, pk):
        """
        Получение пользователя по id.
        """
        try:
            user = User.objects.get(id=pk)
            serializer = UserSerializer(user)  # Используйте свой сериализатор для пользователя
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        """
        Изменение пользователя по id.
        """
        action = request.data.get('action')
        user = User.objects.get(id=id)

        if action == 'block':
            user.is_blocked = True
        elif action == 'unblock':
            user.is_blocked = False

        user.save()
        return Response({'message': 'Пользователь успешно обновлен'})

    def delete(self, request, pk):
        """
        Удаление пользователя по id.
        """
        try:
            user = User.objects.get(id=pk)
            user.delete()
            return Response({'message': 'Пользователь успешно удален'}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)


class RegistrationAPIView(APIView):
    """
    Регистрация пользователя.
    """

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
    """
    Авторизация пользователя.
    """

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
    """
    Получение авторизованного пользователя.
    """

    def get(self, request):
        """
        Получение авторизованного пользователя по токену.
        """
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


class UserViewDetail(APIView):
    def put(self, request, pk):
        """
        Изменение статуса пользователя (становление автором) пользователя по id.
        """
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

        user.author_status = True
        user.save()

        return Response({'message': 'Пользователь успешно обновлен'})


class LogoutView(APIView):
    """
    Выход из аккаунта
    """

    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')

        response.data = {
            'message': 'success'
        }
        return response


class PostView(APIView):
    """
    Получение, создание постов.
    """

    def get(self, request):
        """
         Получение постов.
        """
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Создание поста.
        """
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PostViewDetail(APIView):
    """
    Получение, изменение, удаление постов по id.
    """

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
    """
    Получение, создание категорий.
    """

    def get(self, request):
        """
        Получение категорий.
        """
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Создание категории.
        """
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CategoryViewDetail(APIView):
    """Получение, изменение, удаление категории по ID."""

    def get(self, request, pk):
        """Получение категории по ID"""
        try:
            category = Category.objects.get(pk=pk)
            serializer = CategorySerializer(category)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response({'error': 'Категория не найдена'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        """Изменение категории по id"""
        category = Category.objects.get(pk=category_id)
        serializer = CategorySerializer(category, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        """Удаление категории по id"""
        category = Category.objects.get(pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryUserView(APIView):
    """Получение списка id всех категорий и id всех пользователей относящихся к этой категории. """

    def get(self, request):
        """Получение списка id всех категорий и id всех пользователей относящихся к этой категории. """
        category_users = CategoryUser.objects.all()
        serializer = CategoryUserSerializer(category_users, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Создание новой категории относящейся к какому-то пользователю"""
        serializer = CategoryUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CategoryUserViewDetail(APIView):
    """Получение списка пользователей для заданной категории."""

    def get(self, request, pk):
        """Получение списка пользователей для заданной категории."""
        try:
            category_users = CategoryUser.objects.filter(
                category__id=pk)
            serializer = CategoryUserSerializer(category_users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CategoryUser.DoesNotExist:
            return Response({'error': 'Категория не найдена'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        """Удаление пользователей из заданной категории."""
        try:
            category_users = CategoryUser.objects.filter(category__id=pk)
            category_users.delete()
            return Response({'message': 'Пользователи успешно удалены из категории'}, status=status.HTTP_204_NO_CONTENT)
        except CategoryUser.DoesNotExist:
            return Response({'error': 'Категория не найдена'}, status=status.HTTP_404_NOT_FOUND)


class CommentView(APIView):
    """Получение списка всех комментариев и создание нового комментария."""

    def get(self, request):
        """Получение списка всех комментариев."""
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Создание нового комментария."""
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentViewDetail(APIView):
    """Получение, удаление комментария по его ID."""

    def get(self, request, pk):
        """Получение комментария по его ID."""
        try:
            comment = Comment.objects.get(pk=pk)
            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response({'error': 'Комментарий не найден'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        """Изменение комментария по его ID."""
        try:
            comment = Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            return Response({'error': 'Комментарий не найден'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CommentSerializer(comment, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        """Удаление комментария по его ID."""
        try:
            comment = Comment.objects.get(pk=pk)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response({'error': 'Комментарий не найден'}, status=status.HTTP_404_NOT_FOUND)


class CommentByPostView(APIView):
    """Получение всех комментариев, относящихся к определенному посту."""

    def get(self, request, pk):
        """Получение всех комментариев, относящихся к определенному посту."""
        try:
            comments = Comment.objects.filter(post_id=pk)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response({'error': 'Комментарии к этому посту не найдены'}, status=status.HTTP_404_NOT_FOUND)


class CommentByUserView(APIView):
    """Получение всех комментариев этого пользователя."""

    def get(self, request, pk):
        """Получение всех комментариев данного пользователя по его id."""
        try:
            comments = Comment.objects.filter(user_id=pk)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response({'error': 'Комментарии к этому посту не найдены'}, status=status.HTTP_404_NOT_FOUND)


class LikeView(APIView):
    """Получение всех лайков и создание лайка."""

    def get(self, request):
        """Получение всех лайков."""
        likes = Like.objects.all()
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Создание лайка."""
        serializer = LikeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LikeViewDetail(APIView):
    """Удаление лайка."""

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
    """Получение всех подписок и создание подписки."""

    def get(self, request):
        """Получение всех подписок."""
        subscriptions = Subscription.objects.all()
        serializer = SubSerializer(subscriptions, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Cоздание подписки."""
        author_id = request.data.get('author')
        subscriber_id = request.data.get('subscriber')
        serializer = SubSerializer(data=request.data)

        if author_id == subscriber_id:
            return Response({"error": "Author and subscriber cannot be the same."}, status=status.HTTP_400_BAD_REQUEST)

        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SubscriptionViewDetail(APIView):
    """Удаление подписки по id."""

    def delete(self, request, pk):
        subscription = Subscription.objects.get(pk=pk)
        subscription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SubscriptionsByUserView(APIView):
    """Получение всех подписок определенного пользователя."""

    def get(self, request, pk):
        """Получение всех подписок определенного пользователя."""
        try:
            subscriptions = Subscription.objects.filter(subscriber_id=user_id)
            serializer = SubscriptionSerializer(subscriptions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Subscription.DoesNotExist:
            return Response({'error': 'Подписки не найдены'}, status=status.HTTP_404_NOT_FOUND)


class SubscribersByUserView(APIView):
    """Получение всех подписчиков определенного пользователя."""

    def get(self, request, pk):
        """Получение всех подписчиков определенного пользователя."""
        try:
            subscribers = Subscription.objects.filter(author_id=pk)
            serializer = SubscriptionSerializer(subscribers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Subscription.DoesNotExist:
            return Response({'error': 'Подписчики не найдены'}, status=status.HTTP_404_NOT_FOUND)


class SubscriptionCountView(APIView):
    def get(self, request):
        author_id = request.data.get('author_id')
        subscriber_count = Subscription.objects.filter(author_id=author_id).count()

        return Response({"author_id": author_id, "subscriber_count": subscriber_count})
