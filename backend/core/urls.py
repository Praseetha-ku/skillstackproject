"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from skills.ai_views import  predict_mastery, recommend_resources, summarize_notes
from skills import views
from skills.ai_views import (
    recommend_resources,
    summarize_notes,
    predict_mastery,
    
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/',views.user_login),
    path('api/goals/',views.GoalCreate.as_view()),
    path('api/goals/<int:pk>/',views.GoalList.as_view()),
    path('api/categories/',views.CategoryList.as_view()),
    path('api/goal/<int:skill_id>/logs/',views.DailyTrackListCreate.as_view()),
    path('api/logs/<int:pk>/',views.DailyLogDetailView.as_view()),
    path('api/profile/',views.user_profile),
    path('api/dashboard/', views.dashboard_summary),
    path("api/logs/", views.AllLogsListView.as_view()),
    path("api/ai/<int:skill_id>/recommend/", recommend_resources, name="ai_recommend_resources"),
    path("api/ai/<int:skill_id>/summary/", summarize_notes, name="ai_summarize_notes"),
    path("api/ai/<int:skill_id>/predict/", predict_mastery, name="ai_predict_mastery"),
  
   



]
