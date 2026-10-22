from django.db import models

# Create your models here.
class Profile(models.Model):
    name=models.CharField(max_length=200)
    title=models.CharField(max_length=200)
    bio=models.TextField()
    phone=models.CharField(max_length=20, blank=True)
    email=models.EmailField()
    location=models.CharField(max_length=20, blank=True)
    github=models.URLField( blank=True)
    linkedin=models.URLField(blank=True)
    twitter=models.URLField(blank=True)
    resume=models.FileField(upload_to='resumes/' , blank=True, null=True)
    profile_image=models.ImageField(upload_to='profiles/',blank=True, null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Skills(models.Model):
    CATEGORY_CHOICES=[
        ('Frontend','Frontend'),
        ('Backend','Backend'),
        ('Database','Database'),
        ('IoT','IoT'),
        ('Tools','Tools'),
        ('Other','Other'),
    ]
    name=models.CharField(max_length=100)
    category=models.CharField(max_length=100,choices=CATEGORY_CHOICES)
    proficiency=models.IntegerField(default=50)
    icon=models.CharField(max_length=50, blank=True)
    order=models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.category})"

    class Meta:
        ordering=['order','category','name']

class Project(models.Model):
    title=models.CharField(max_length=200)
    description=models.TextField()
    technologies=models.CharField(max_length=500)
    image=models.ImageField(upload_to='projects/',blank=True, null=True)
    github_url=models.URLField( blank=True)
    live_url=models.URLField(blank=True)
    featured=models.BooleanField(blank=False)
    order=models.IntegerField(default=0)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering=['-featured','order','created_at']

class Experience(models.Model):
    company=models.CharField(max_length=200)
    position=models.CharField(max_length=200)
    description=models.TextField()
    start_date=models.DateField()
    end_date=models.DateField(null=True,blank=True)
    current=models.BooleanField(default=False)
    location=models.CharField(max_length=20, blank=True)
    company_logo=models.ImageField(upload_to='companies/',blank=True, null=True)
    

    def __str__(self):
        return f"{self.position} at {self.company}"

    class Meta:
        ordering=['-start_date']


class Contact(models.Model):
    name=models.CharField(max_length=200)
    email=models.EmailField()
    subject=models.CharField(max_length=20, blank=True)
    message=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

    class Meta:
        ordering=['-created_at']