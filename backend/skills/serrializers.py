from rest_framework import serializers
from .models import Category, Skill, SkillDailyLog

class CategorySerializer(serializers.ModelSerializer):

    """
    Docstring for CategorySerializer

    -used for handlimg category serilaization it helps list all categories and categories based filteration
    mainly dashboard break down

    fileds:
    -id
    -name
    """

    class Meta:
        model=Category
        fields= "__all__"

class SkillSerializer(serializers.ModelSerializer):
   
    """
    Docstring for SkillSerializer
    it handles skill model validation and calculate total hours based on skill dailylog entries

    -validate uniqueskill name per user
    -validate custom platform if the user enter platform = 'other'
    -the total_hours is readonly
    - difficulty and main notes & certificate allow only after complted status  

     including fileds are:
     -name
     -category
     -custom_platform
     -resource_type
     -status
     -difficulty
     -certificate_url
     -complted_on
     -main_point
     -total_hours (readonly)

    """
    total_hours = serializers.ReadOnlyField()
    class Meta:
       model = Skill
       exclude = ["user"]
    def validate(self,data):

        """
        Docstring for validate
        
        validation based on learning status

        """
        platform = data.get("platform")
        custom_platform = data.get("custom_platform")
        status_values = data.get("status")
        difficulty = data.get("difficulty")
        main_note = data.get("main_point")
        certificate_url = data.get("certificate_url")

        # Platform validation
        if platform == "other" and not custom_platform:
            raise serializers.ValidationError({"custom_platform": "'other' filed required corresponding custom_platform name"})
        
        # Staus based validation fro difficulty
        if status_values != "completed" and difficulty is not None:
            raise serializers.ValidationError({"difficulty":"you caan add diffculty level after completion"})
        # Staus based validation for MainNote
        if status_values != "completed" and main_note:
            raise serializers.ValidationError({"main_point":"add mainpoint only after completion"})
        # Status based certificate url validation
        if status_values != "completed" and certificate_url:
            raise serializers.ValidationError({"certificate_url": "add certificate after completion"})
        
        return data
    def skill_name_validation(self, value):
        """
        Docstring for skill_name_validation
        
        if user adding sameskill multiple times this validation preventing from that
        """
        user = self.context["request"].user
        if Skill.objects.filter(user=user , name=value).exists():
            raise serializers.ValidationError("Skill already added PLease check your list.")
        return value
    
class SkillDailyLogSerializer(serializers.ModelSerializer):
        """
        Docstring for SkillDailyLogSerializer
        Serialaizer for daily learning logs.
        record their daily learning datea and notes.
        """
        class Meta:
            model = SkillDailyLog
            fields = "__all__"