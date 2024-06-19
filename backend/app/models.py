from datetime import datetime

from django.db import models

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, AbstractUser

from django.core.exceptions import ValidationError


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


class Post(models.Model):
    post_id = models.BigAutoField(primary_key=True)

    title = models.CharField('title', max_length=100)
    content = models.CharField('content', max_length=500)

    image = models.ImageField('post_image', default="image")

    current_date = datetime.now().strftime('%Y-%m-%d')
    publish_date = models.DateField(default=current_date, verbose_name="registration_date")

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    like_count = models.IntegerField('like_count', default=0)

    class Meta:
        db_table = 'post'


class Like(models.Model):
    like_id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        db_table = 'like'
        unique_together = ('user_id', 'post_id')


class Category(models.Model):
    category_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'category'


class CategoryUser(models.Model):
    category_user_id = models.BigAutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'category_user'


class Comment(models.Model):
    comment_id = models.BigAutoField(primary_key=True)

    text = models.CharField(max_length=255)
    current_date = datetime.now().strftime('%Y-%m-%d')
    date_posted = models.DateField(default=current_date, verbose_name="Date Posted")

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        db_table = 'comment'


class Subscription(models.Model):
    sub_id = models.BigAutoField(primary_key=True)
    author = models.ForeignKey(User, related_name='author', on_delete=models.CASCADE)
    subscriber = models.ForeignKey(User, related_name='subscriber', on_delete=models.CASCADE)

    class Meta:
        db_table = 'subscription'
        unique_together = ('author', 'subscriber')
