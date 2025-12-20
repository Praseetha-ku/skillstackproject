import os
import datetime
from google import genai
from google.genai import types
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum
from skills.models import Skill, SkillDailyLog

# Initialize the Gemini client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
MODEL_ID = "gemini-2.5-flash"

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recommend_resources(request, skill_id):
    """
    Fetches a list of recommended learning materials for a specific skill.
    It uses Gemini AI to find 5 high-quality resources, including direct 
    URLs and platform names, tailored to the skill name.
    """
    try:
        skill = Skill.objects.get(id=skill_id)
        
        prompt = (
            f"Suggest 5 high-quality learning resources for {skill.name}. "
            "For each resource, provide the Title, the Platform, and the "
            "DIRECT URL/Link (e.g., https://...). Ensure the links are functional."
        )

        response = client.models.generate_content(
            model=MODEL_ID,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction="You are a learning coach who provides direct web links for study materials."
            )
        )
        
        return Response({"recommendations": response.text})
    except Skill.DoesNotExist:
        return Response({"error": "Skill not found"}, status=404)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def summarize_notes(request, skill_id):
    """
    Takes long-form study notes provided by the user and generates 
    a concise, bulleted summary using AI. This helps users review 
    their key takeaways quickly.
    """
    text = request.data.get("text", "")
    
    if not text:
        return Response({"error": "No text provided"}, status=400)

    response = client.models.generate_content(
        model=MODEL_ID,
        contents=f"Please summarize the following learning notes:\n{text}",
        config=types.GenerateContentConfig(
            system_instruction="You are a concise summarizer. Use bullet points."
        )
    )
    
    return Response({"summary": response.text})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def predict_mastery(request, skill_id):
    """
    Calculates a predicted completion date based on the user's historical 
    learning logs. It measures the total hours spent versus a default 
    mastery threshold (20 hours) to estimate days remaining.
    """
    try:
        skill = Skill.objects.get(id=skill_id)
        logs = SkillDailyLog.objects.filter(skill=skill)

        total_hours = logs.aggregate(total=Sum("hours"))["total"] or 0
        count = logs.count() or 1
        avg_daily = total_hours / count if total_hours > 0 else 1

        # Logic: Assume 20 hours is the basic mastery goal
        remaining = 20 - total_hours
        est_days = max(1, remaining / avg_daily)
        predicted_date = datetime.date.today() + datetime.timedelta(days=est_days)

        return Response({
            "skill": skill.name,
            "total_hours_logged": total_hours,
            "estimated_days_remaining": round(est_days),
            "predicted_completion_date": predicted_date
        })
    except Skill.DoesNotExist:
        return Response({"error": "Skill not found"}, status=404)

