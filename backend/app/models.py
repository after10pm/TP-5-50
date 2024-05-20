from datetime import datetime

from django.db import models

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user


class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    name = models.CharField('name', max_length=40)
    email = models.EmailField('email', max_length=100)
    password = models.CharField('password', max_length=30)
    date_of_birth = models.DateField('date_of_birth')
    current_date = datetime.now().strftime('%Y-%m-%d')
    registration_date = models.DateField(default=current_date, verbose_name="registration_date")
    author_status = models.BooleanField(default=False, verbose_name="author_status")
    is_blocked = models.BooleanField(default=False, verbose_name="is_blocked")
    is_staff = models.BooleanField(default=False, verbose_name="is_staff")

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

    class Meta:
        db_table = 'user'
