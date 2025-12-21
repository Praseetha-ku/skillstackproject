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

Project Setup & Installation
1. Clone the Repository
git clone https://github.com/Praseetha-ku/skillstackproject.git
cd skillstackproject

Backend Setup (Django)

Move to backend folder:

cd backend

1. Create Virtual Environment

Windows

python -m venv venv
venv\Scripts\activate


Mac/Linux

python -m venv venv
source venv/bin/activate

2. Install Dependencies
pip install -r requirements.txt

3. Run Migrations
python manage.py migrate

4. Create Superuser
python manage.py createsuperuser

5. Add .env File

Create .env inside backend folder:

GEMINI_API_KEY=your_api_key_here

6. Start Backend Server
python manage.py runserver

Frontend Setup (React + Vite)

Move to frontend:

cd frontend

1. Install Required Packages
npm install
npm install axios react-router-dom

2. Start Frontend
npm run dev
