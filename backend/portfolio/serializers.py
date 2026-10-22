from rest_framework import serializers
from .models import Profile, Skills, Experience, Project, Contact

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profile
        fields='__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skills
        fields='__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields='__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Experience
        fields='__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model=Contact
        fields='__all__'
        read_only_fields=['created_at']