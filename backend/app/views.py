import datetime
import jwt
from rest_framework import status, viewsets
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from app.models import User
from app.serializers import UserSerializer


class UsersView(APIView):
    def get(self, request, id=None):  # Делаем user_id опциональным параметром
        if id is not None:
            user = User.objects.get(pk=id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            # Логика для получения всех пользователей
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

