from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Profile,Skills,Experience,Project,Contact
from .serializers import ProfileSerializer,SkillSerializer,ProjectSerializer,ExperienceSerializer,ContactSerializer

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



