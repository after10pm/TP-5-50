"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, re_path, include
from rest_framework_simplejwt.views import TokenRefreshView

from app import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from .yasg import urlpatterns as doc_urls
from django.views.generic import TemplateView

from app.views import RegistrationAPIView, LoginAPIView, PostView, CategoryView

urlpatterns = [
    path('users/', views.UsersView.as_view(), name='user-view'),
    path('users/change/<int:id>/', views.UsersView.as_view(), name='user-change'),
    path('users/delete/<int:id>/', views.UsersView.as_view(), name='user-delete'),
    path('users/<int:id>/', views.UsersView.as_view(), name='user-detail'),
    path('register/', RegistrationAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('change/author_status/<int:id>/', views.UserView.as_view()),
    path('user/', views.UserView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('posts/', views.PostView.as_view()),
    path('posts/<int:pk>/', views.PostViewDetail.as_view()),

    path('category/', views.CategoryView.as_view()),
    path('category/delete/', views.CategoryViewDetail.as_view()),
    path('categoryUser/', views.CategoryUserView.as_view()),
    path('comment/', views.CommentView.as_view()),
    path('comment/delete/', views.CommentDetailView.as_view()),
    path('likes/', views.LikeView.as_view()),
    path('like/delete/', views.LikeDetailView.as_view()),
    path('subscriptions/', views.SubscriptionView.as_view(), ),
    path('subscriptions/delete/', views.SubscriptionDetailView.as_view(),),
    path('subscriptionsCount/', views.SubscriptionCountView.as_view(),)
]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += doc_urls