from django.db import models
from django.db.models import Sum

# Create your models here.
class Category(models.Model):

    """
    Docstring for Category
    Category model respresent the grouping of skills and help for category based dashbaord.
    examples are: like programming , datascience , design etc
    """

    name=models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Skill(models.Model):

        """
        Docstring for Skill
        the model stores leraning goals of user
        
        it includes:
        -skill information example:skill name
        -platform & resource type : example platform:udemy , resource: video
        -current progress of that skill
        -total learning hours 
        -gerneral note about that skill after the course completed
        """

        STATUS_CHOICE = [
            ('started', 'Started'),
            ('in_progress', 'In Progress'),
            ('completed', 'Completed'),
        ]
        RESOURCE_CHOICES = [
            ('video', 'Video'),
            ('course', 'Course'),
            ('article', 'Article'),
        ]

        PLATFORM_CHOICES =[
            ('udemy', 'Udemy'),
            ('youtube', 'YouTube'),
            ('coursera', 'Coursera'),
            ('other', 'Other'),
        ]
        DIFFICULTY_CHOICES = [
            (1, 'Easy'),
            (2, 'Medium'),
            (3, 'Hard'),
        ]

        name = models.CharField(max_length=150)
        category = models.ForeignKey(Category, on_delete=models.SET_NULL,null=True, related_name='skills')
        platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
        resource_type = models.CharField(max_length=50, choices=RESOURCE_CHOICES)
        status = models.CharField(max_length=20, choices=STATUS_CHOICE, default='started')
        difficulty = models.PositiveSmallIntegerField(choices=DIFFICULTY_CHOICES, null=True, blank=True)
        certification=models.BooleanField(default=False)
        certificate_url = models.URLField(blank=True, null=True)
        completed_on=models.DateField(blank=True, null=True)
        main_point=models.TextField(blank=True)
        created_at=models.DateTimeField(auto_now_add=True)
        updated_at=models.DateTimeField(auto_now=True)

        @property
        def total_hours(self):
            
            """
            Docstring for total_hours
            for calculating the total hours dynamically in main listing course page
            daily learning log time used to caluclate the total hours
            :param self: Description
            """

            return self.logs.aggregate(
                total=Sum('hours')
            )['total'] or 0
        
        def __str__(self):
            return self.name
        
class SkillDailyLog(models.Model):

            """
            Docstring for SkillDailyLog
            daily learning of user 

            """

            skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='logs')
            date=models.DateField(auto_now_add=True)
            hours=models.DecimalField(max_digits=4, decimal_places=2)
            note=models.TextField(blank=True)
            
            def __str__(self):
                return f"{self.skill.name} - {self.date}"

        
