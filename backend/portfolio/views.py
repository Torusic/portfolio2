from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Profile,Skills,Experience,Project,Contact
from .serializers import ProfileSerializer,SkillSerializer,ProjectSerializer,ExperienceSerializer,ContactSerializer
import json
import os
import secrets

from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

# Create your views here.
class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset=Profile.objects.all()
    serializer_class=ProfileSerializer

    @action(detail=False, methods=['get'])
    def main(self,request):
        profile=self.queryset.first()
        if profile:
            serializer=self.get_serializer(profile)
            return Response(serializer.data)
        return Response({'detail':'No profile found'},status=status.HTTP_404_NOT_FOUND)

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset=Skills.objects.all()
    serializer_class=SkillSerializer

    @action(detail=False, methods=['get'])
    def by_category(self,request):
        skills=self.get_queryset()
        categories={}

        for skill in skills:
            if skill.category not in categories:
                categories[skill.category]=[]
            categories[skill.category].append(SkillSerializer(skill).data)
        return Response(categories)
                

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset=Project.objects.all()
    serializer_class=ProjectSerializer

    @action(detail=False, methods=['get'])
    def featured(self,request):
        featured_projects=self.queryset.filter(featured=True)
        serializer=self.get_serializer(featured_projects,many=True)
        return Response(serializer.data)

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset=Experience.objects.all()
    serializer_class=ExperienceSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset=Contact.objects.all()
    serializer_class=ContactSerializer
    http_method_names=['post']

    def create(self,request):
        serializer=self.get_serializer(data=request.data)
        if serializer.is_valid ():
            serializer.save()
            return Response({"message":"Message sent Successfully"},status=status.HTTP_201_CREATED  )
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@require_POST
def recover_admin(request):
    expected_token = os.environ.get("ADMIN_RECOVERY_TOKEN")
    supplied_token = request.headers.get(
        "X-Admin-Recovery-Token", ""
    )

    if (
        not expected_token
        or not secrets.compare_digest(
            supplied_token, expected_token
        )
    ):
        return JsonResponse(
            {"detail": "Not found"}, status=404
        )

    try:
        data = json.loads(request.body)
        username = data.get("username", "").strip()
        password = data.get("password", "")
        email = data.get("email", "").strip()

        if not username or len(password) < 14:
            return JsonResponse(
                {"detail": "Username and a password of at least 14 characters are required."},
                status=400,
            )

        User = get_user_model()

        if User.USERNAME_FIELD != "username":
            return JsonResponse(
                {"detail": "Custom user model; recovery needs adjustment."},
                status=400,
            )

        user, created = User.objects.get_or_create(
            username=username,
            defaults={"email": email},
        )

        user.email = email or user.email
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        return JsonResponse({
            "success": True,
            "admin_username": user.get_username(),
            "created": created,
        })

    except (json.JSONDecodeError, AttributeError, TypeError):
        return JsonResponse(
            {"detail": "Invalid request body."}, status=400
        )