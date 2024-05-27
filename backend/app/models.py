from datetime import datetime

from django.db import models

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, AbstractUser


class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField('name', max_length=40, unique=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField('password', max_length=255)
    date_of_birth = models.DateField('date_of_birth')
    current_date = datetime.now().strftime('%Y-%m-%d')
    registration_date = models.DateField(default=current_date, verbose_name="registration_date")
    author_status = models.BooleanField(default=False, verbose_name="author_status")
    is_blocked = models.BooleanField(default=False, verbose_name="is_blocked")
    is_staff = models.BooleanField(default=False, verbose_name="is_staff")
    user_image = models.ImageField('user_image', max_length=250)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'user'
