from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.generics import ( ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView)
from backend.skills.models import Category, Skill, SkillDailyLog
from backend.skills.serrializers import CategorySerializer, SkillSerializer,SkillDailyLogSerializer
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum

# Create your views here.
@api_view(['POST'])
def user_login(request):
    """
    Docstring for user_login
    
     in this authenticate a user and return token for login.
     in this iam not including registration registration is happening through admin.
    """
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username,password=password)
    if not user:
        return Response({"error":"occur due to Invalid username/password"}, status=400)
    token = Token.objetcs.get_or_create(user=user)
    return Response({"token":token.key}, status=200)

class GoalCreate(ListCreateAPIView):
    """
    Docstring for GoalCreate
    crate a goal for logged in user
    pagination included
    serach and filter 
    """
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]
    filter_backends =[DjanoFilterBackend, SearchFilter,OrderingFilter]
    filterset_fields = [
        "category",
        "platform",
        "resource_type",
        "learning_type",
        "status",
        "difficulty",
    ]
    search_fields = ["name"]
    ordering_fields = ["created_at", "updated_at"]
    def get_queryset(self):
        return Skill.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class GoalList(RetrieveUpdateDestroyAPIView):
    """
    Docstring for GoalList
    in this listing a single goal based on id and goal and update the goal and delete the goal
    """
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Skill.objects.filter(user=self.request.user)
    
class CategoryList(ListAPIView):
    """
    Docstring for CategoryList
    all availalabele category listing
    Category add permisiion only have the admin
    """
    queryset = Category.objects.all()  
    serializer_class = CategorySerializer

class DailyTrackList(ListCreateAPIView):
    """
    Docstring for DailyTrackList
    in this user can daily track their progress based on their skill
    """
    serializer_class = SkillDailyLogSerializer
    permission_classes = [IsAuthenticated]
    filter_backends= [SearchFilter,OrderingFilter]
    search_fields = ['note']
    ordering_fields = ["date","hours"]
    def get_queryset(self):
        skill_id =self.kwargs["skill_id"]
        return SkillDailyLog.objects.filter(skill_id=skill_id, skill_user=self.request.user)
    def perform_create(self, serializer):
        serializer.save()
class DailyLogDetailView(RetrieveUpdateDestroyAPIView):
   

    serializer_class = SkillDailyLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SkillDailyLog.objects.filter(
            skill__user=self.request.user
        )
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile(request):
    """
    Docstring for user_profile
    
    -username
    -join date
    -total skills added
    -total completed skills
    -total hours learned
    """
    user = request.user
    skills = Skill.objects.filter(user=user)

    total_hours = SkillDailyLog.objects.filter(
        skill__user=user
    ).aggregate(total=Sum("hours"))["total"] or 0

    return Response({
        "username": user.username,
        "joined_on": user.date_joined.date(),
        "total_skills": skills.count(),
        "completed_skills": skills.filter(status="completed").count(),
        "total_hours": total_hours,
    })
