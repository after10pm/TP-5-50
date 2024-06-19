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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class UsersViewDetail(APIView):
    """
    Получение, изменение, удаление пользователя по id.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        """
        Получение пользователя по id.
        """
        try:
            user = User.objects.get(id=pk)
            serializer = UserSerializer(user)
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
            return Response({'error': 'Неправильный email или пароль'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.check_password(password):
            return Response({'error': 'Неправильный email или пароль'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken.for_user(user)
            refresh.payload.update({
                'user_id': user.id,
                'name': user.name
            })
            token = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            response = Response(token, status=status.HTTP_200_OK)
            response.set_cookie(key='jwt', value=str(token['access']), httponly=False)
            return response

        except TokenError as e:
            return Response({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)


class UserView(APIView):
    """
    Получение авторизованного пользователя.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Получение авторизованного пользователя по токену.
        """
        user_id = request.user.id

        user = User.objects.filter(id=user_id).first()
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
    """Выход из аккаунта"""
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        """
        Получение постов пользователя по его ID.
        """
        try:
            posts = Post.objects.filter(user=pk)
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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
        category = Category.objects.get(pk=pk)
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
    permission_classes = [IsAuthenticated]

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
                category=pk)
            serializer = CategoryUserSerializer(category_users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CategoryUser.DoesNotExist:
            return Response({'error': 'Категория не найдена'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        """Удаление пользователей из заданной категории."""
        try:
            category_users = CategoryUser.objects.filter(category=pk)
            category_users.delete()
            return Response({'message': 'Пользователи успешно удалены из категории'}, status=status.HTTP_204_NO_CONTENT)
        except CategoryUser.DoesNotExist:
            return Response({'error': 'Категория не найдена'}, status=status.HTTP_404_NOT_FOUND)


class CommentView(APIView):
    """Получение списка всех комментариев и создание нового комментария."""
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        like_id = request.data.get('like_id')
        like = Like.objects.get(pk=like_id)
        like.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@receiver(post_save, sender=Like)
@receiver(post_delete, sender=Like)
def update_like_count(sender, instance, **kwargs):
    post_id = instance.post
    like_count = Like.objects.filter(post=post_id).count()
    Post.objects.filter(post_id=post_id).update(like_count=like_count)


class SubscriptionView(APIView):
    """Получение всех подписок и создание подписки."""
    permission_classes = [IsAuthenticated]

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
    """Удаление подписки по author_id и user_id."""
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk_a, pk_u):
        """Удаление подписки по author_id и user_id."""
        try:
            subscription = Subscription.objects.get(
                author=pk_a, subscriber=pk_u
            )
            subscription.delete()
            return Response('succses', status=status.HTTP_204_NO_CONTENT)
        except Subscription.DoesNotExist:
            return Response(
                {"error": "Подписка не найдена"}, status=status.HTTP_404_NOT_FOUND
            )

    def get(self, request, pk_a, pk_u):
        """Проверка, подписан ли user на author."""
        try:
            Subscription.objects.get(author=pk_a, subscriber=pk_u)
            return Response({"isSubscribed": True}, status=status.HTTP_200_OK)
        except Subscription.DoesNotExist:
            return Response({"isSubscribed": False}, status=status.HTTP_200_OK)


class SubscriptionsByUserView(APIView):
    """Получение всех подписок определенного пользователя."""
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        """Получение всех подписок определенного пользователя."""
        try:
            subscriptions = Subscription.objects.filter(subscriber=pk)
            authors = [sub.author for sub in subscriptions]  # Получаем авторов из подписок
            serializer = UserSerializer(authors, many=True)  # Сериализуем авторов
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Subscription.DoesNotExist:
            return Response({'error': 'Подписки не найдены'}, status=status.HTTP_404_NOT_FOUND)


class SubscribersByUserView(APIView):
    """Получение всех подписчиков определенного пользователя."""
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        """Получение всех подписчиков определенного пользователя."""
        try:
            subscribers = Subscription.objects.filter(author=pk)
            serializer = SubscriptionSerializer(subscribers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Subscription.DoesNotExist:
            return Response({'error': 'Подписчики не найдены'}, status=status.HTTP_404_NOT_FOUND)


class SubscriptionCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        author_id = request.data.get('author')
        subscriber_count = Subscription.objects.filter(author=author_id).count()

        return Response({"author_id": author_id, "subscriber_count": subscriber_count})
