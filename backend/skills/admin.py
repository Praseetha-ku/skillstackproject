from django.contrib import admin

from .models import Category, Skill, SkillDailyLog

# Register your models here.
admin.site.register(Category)
admin.site.register(Skill)
admin.site.register(SkillDailyLog)
