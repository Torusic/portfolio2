from django.contrib import admin
from .models import Profile,Skills,Experience,Project,Contact

# Register your models here.
admin.site.register(Profile)
admin.site.register(Skills)
admin.site.register(Project)
admin.site.register(Experience)
admin.site.register(Contact)
