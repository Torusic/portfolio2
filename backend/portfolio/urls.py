from django.urls import path,include

from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet,SkillViewSet,ProjectViewSet,ExperienceViewSet,ContactViewSet,recover_admin
 
router=DefaultRouter()
router.register(r'profile',ProfileViewSet,basename='profile')
router.register(r'skills',SkillViewSet,basename='skill')
router.register(r'projects',ProjectViewSet,basename='projects')
router.register(r'experience',ExperienceViewSet,basename='experience')
router.register(r'contact',ContactViewSet,basename='contact')
urlpatterns=[
    path('',include(router.urls))

]