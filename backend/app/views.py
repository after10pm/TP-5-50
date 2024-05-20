from rest_framework.response import Response


from django.core.exceptions import ValidationError
from app.models import User
from rest_framework.views import APIView

from app.serializers import UserSerializer

from rest_framework import status


class UserView(APIView):
    def get(self, request):
        output = [
            {
                'user_id': output.user_id,
                'name': output.name,
                'email': output.email,
                'password': output.password,
                'date_of_birth': output.date_of_birth,
                'registration_date': output.registration_date,
                'author_status': output.author_status,
                'is_blocked': output.is_blocked,
                'is_staff': output.is_staff
            } for output in User.objects.all()

        ]
        return Response(output)

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

    def put(self, request, user_id):
        action = request.data.get('action')
        user = User.objects.get(user_id=user_id)

        if action == 'block':
            user.is_blocked = True
        elif action == 'unblock':
            user.is_blocked = False

        user.save()
        return Response({'message': 'Пользователь успешно обновлен'})

    def delete(self, request, user_id):
        try:
            user = User.objects.get(user_id=user_id)
            user.delete()
            return Response({'message': 'Пользователь успешно удален'}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)
