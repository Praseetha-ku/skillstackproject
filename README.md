# SkillStack

Skillstack is a personal skill-buildingtracker for courses, tutorials, and certifications.

## Features

-Add learning goals with skill name, platform, and resource type and hours any Notes thats optional
-Track progress (started, in-progress, completed)
-Log hours spent, difficulty, and notes
-user can trak their daily study plan based on their goal created
-user will get a based summaraise note, and skillname based resource type and goal completion prediction
-searching based on goalname/skillname
-filtering and sorting based on category and plactformtype and learning type and datebased and difficulty based
-user can and daily goals based on their goal
-Dashboard for skill growth insights
-pagination added
-in this only goal completed users can add main note and difficulty level and certification url

## Tech Stack

-Frontend: Reactjs
-Backend: Django (Django -REST Framework)
-Database: SQLite
-AI-used gemini secretkey and gemini-2.5-flash
-.env for sercert key

## for login use create super name and password

in my case i used craetesuper name and password
name :Praseetha
password :Achu123@


## Scope Note

This appilcation is designed as a Single-user Personal Tracker
Authentication is intentionally excluded to keep the scope aligned with requirements.
in this appilcation backend add detail docstring in every file 

# Project StepUP & Installation
Clone Repo
git clone https://github.com/Praseetha-ku/skillstackproject.git
cd skillstackproject
cd backend

Backend Setup (Django)
Create virtual env
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

Install dependencies
pip install -r requirements.txt

Migrate
python manage.py migrate

Create superuser
python manage.py createsuperuser

Add .env
GEMINI_API_KEY=your_api_key

Run server
python manage.py runserver

Frontend Setup (React)

Go to frontend folder:

cd frontend


Install required packages:

npm install
npm install axios react-router-dom


Run application:

npm run dev