from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Configure Gemini AI
GEMINI_API_KEY = "AIzaSyC_Pv4NzIDOOH4aRBKvqfQV9Hd-1tE_k-U"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash-exp')

# Ensure data directory exists
DATA_DIR = 'data'
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# Initialize JSON files if they don't exist
def init_data_files():
    files = {
        'moods.json': [],
        'users.json': [],
        'escalations.json': [],
        'appointments.json': []
    }
    for filename, default_content in files.items():
        filepath = os.path.join(DATA_DIR, filename)
        if not os.path.exists(filepath):
            with open(filepath, 'w') as f:
                json.dump(default_content, f)

init_data_files()

# Helper functions
def read_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r') as f:
        return json.load(f)

def write_json(filename, data):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

# Routes
@app.route('/')
def index():
    return render_template('index-tailwind.html')

@app.route('/old')
def index_old():
    return render_template('index.html')

@app.route('/new')
def index_new():
    return render_template('index-new.html')

@app.route('/meditation')
def meditation():
    return render_template('meditation-tailwind.html')

@app.route('/crisis')
def crisis():
    return render_template('crisis-tailwind.html')

@app.route('/forum')
def forum():
    return render_template('forum-tailwind.html')

@app.route('/appointments')
def appointments():
    return render_template('appointments-tailwind.html')

@app.route('/doctor')
def doctor_portal():
    return render_template('doctor-portal.html')

# API Routes
@app.route('/api/mood', methods=['GET', 'POST'])
def mood():
    moods = read_json('moods.json')
    
    if request.method == 'POST':
        data = request.json
        mood_entry = {
            'id': len(moods) + 1,
            'emoji': data.get('emoji'),
            'emotion': data.get('emotion'),
            'intensity': data.get('intensity'),
            'note': data.get('note', ''),
            'timestamp': datetime.now().isoformat()
        }
        moods.append(mood_entry)
        write_json('moods.json', moods)
        return jsonify({'success': True, 'message': 'Great check-in! 🌟', 'data': mood_entry})
    
    return jsonify(moods)

@app.route('/api/appointments', methods=['GET', 'POST'])
def appointments_api():
    appointments = read_json('appointments.json')
    
    if request.method == 'POST':
        data = request.json
        appointment = {
            'id': len(appointments) + 1,
            'studentName': data.get('name'),
            'studentEmail': data.get('email'),
            'studentPhone': data.get('phone'),
            'sessionType': data.get('sessionType'),
            'preferredType': data.get('preferredType', 'video'),
            'appointmentDate': data.get('date'),
            'appointmentTime': data.get('time'),
            'appointmentReason': data.get('reason'),
            'reminderEmail': data.get('reminderEmail', True),
            'status': 'pending',
            'createdAt': datetime.now().isoformat()
        }
        appointments.append(appointment)
        write_json('appointments.json', appointments)
        return jsonify({'success': True, 'message': 'Appointment booked successfully!', 'data': appointment})
    
    return jsonify(appointments)

@app.route('/api/recommendations', methods=['GET'])
def recommendations():
    # Get recent moods to personalize recommendations
    moods = read_json('moods.json')
    
    # Default recommendations (fallback)
    default_recommendations = [
        {
            'title': 'Take a Deep Breath',
            'description': 'Try our 4-7-8 breathing technique to calm your mind.',
            'icon': '🌬️',
            'link': '/meditation'
        },
        {
            'title': 'Daily Meditation',
            'description': 'Start with just 5 minutes of guided meditation.',
            'icon': '🧘',
            'link': '/meditation'
        },
        {
            'title': 'Connect with Peers',
            'description': 'Share your thoughts in our supportive community.',
            'icon': '💬',
            'link': '/forum'
        },
        {
            'title': 'Schedule Counseling',
            'description': 'Book a session with a professional counselor.',
            'icon': '📅',
            'link': '/appointments'
        }
    ]
    
    # If we have mood data, use AI for personalized recommendations
    if moods and len(moods) > 0:
        try:
            print(f"🤖 Attempting to generate AI recommendations for {len(moods)} mood entries...")
            ai_recommendations = get_ai_recommendations(moods)
            if ai_recommendations and len(ai_recommendations) > 0:
                print(f"✨ AI generated {len(ai_recommendations)} personalized recommendations")
                return jsonify(ai_recommendations)
            else:
                print("⚠️ AI returned empty recommendations, using defaults")
        except Exception as e:
            print(f"❌ AI recommendation error: {str(e)}")
            import traceback
            traceback.print_exc()
            # Fall back to default recommendations
    
    # If user logged stressful moods, prioritize calming exercises
    if moods and len(moods) > 0:
        recent_moods = moods[-5:]
        stressful_emotions = ['anxious', 'stressed', 'overwhelmed', 'sad']
        if any(mood.get('emotion') in stressful_emotions for mood in recent_moods):
            default_recommendations.insert(0, {
                'title': 'Immediate Calm Exercise',
                'description': 'You seem stressed. Let\'s do a quick 2-minute breathing exercise.',
                'icon': '🌟',
                'link': '/meditation',
                'priority': True
            })
    
    return jsonify(default_recommendations)

@app.route('/api/crisis', methods=['GET'])
def crisis_info():
    crisis_data = {
        'helplines': [
            {
                'name': 'National Suicide Prevention Lifeline',
                'number': '988',
                'available': '24/7'
            },
            {
                'name': 'Crisis Text Line',
                'number': 'Text HOME to 741741',
                'available': '24/7'
            },
            {
                'name': 'Campus Counseling Center',
                'number': '1-800-273-8255',
                'available': 'Mon-Fri 9AM-5PM'
            },
            {
                'name': 'International Association for Suicide Prevention',
                'number': 'Visit iasp.info',
                'available': 'Resources worldwide'
            }
        ],
        'message': 'You\'re not alone — help is available now. Take a deep breath. Someone is here to listen.'
    }
    return jsonify(crisis_data)

@app.route('/api/meditations', methods=['GET'])
def meditations():
    meditation_sessions = [
        {
            'id': 1,
            'title': 'Morning Calm',
            'duration': '5 min',
            'type': 'Guided Meditation',
            'description': 'Start your day with peaceful energy',
            'audio': 'morning-calm.mp3'
        },
        {
            'id': 2,
            'title': '4-7-8 Breathing',
            'duration': '3 min',
            'type': 'Breathing Exercise',
            'description': 'Quick stress relief technique',
            'audio': '4-7-8-breathing.mp3'
        },
        {
            'id': 3,
            'title': 'Body Scan',
            'duration': '10 min',
            'type': 'Guided Meditation',
            'description': 'Release tension from head to toe',
            'audio': 'body-scan.mp3'
        },
        {
            'id': 4,
            'title': 'Box Breathing',
            'duration': '5 min',
            'type': 'Breathing Exercise',
            'description': 'Used by Navy SEALs for focus',
            'audio': 'box-breathing.mp3'
        },
        {
            'id': 5,
            'title': 'Sleep Preparation',
            'duration': '15 min',
            'type': 'Guided Meditation',
            'description': 'Drift into peaceful sleep',
            'audio': 'sleep-prep.mp3'
        }
    ]
    return jsonify(meditation_sessions)

def get_ai_recommendations(moods):
    """
    Use Gemini AI to generate personalized mental health recommendations
    based on user's mood history with advanced prompt engineering.
    """
    try:
        # Analyze recent mood patterns (last 7 entries)
        recent_moods = moods[-7:] if len(moods) > 7 else moods
        
        # Build mood summary
        mood_summary = []
        for mood in recent_moods:
            mood_summary.append({
                'emotion': mood.get('emotion', 'unknown'),
                'intensity': mood.get('intensity', 5),
                'note': mood.get('note', '')[:100]  # Limit note length
            })
        
        # Sophisticated Prompt Engineering for Mental Health
        prompt = f"""You are a compassionate mental health support assistant for university students using MindfulCampus, a wellness app supporting SDG 3: Good Health and Well-being.

**Your Role:**
- Analyze mood patterns with empathy and understanding
- Provide actionable, evidence-based wellness recommendations
- Use warm, supportive language (never clinical or cold)
- Prioritize student mental health and crisis awareness
- Keep recommendations practical and achievable

**User's Recent Mood History:**
{json.dumps(mood_summary, indent=2)}

**Available App Features:**
1. Meditation & Breathing (4-7-8 breathing, box breathing, guided meditation)
2. Peer Support Forum (anonymous community)
3. Professional Counseling (scheduling appointments)
4. Crisis Resources (24/7 helplines)

**Task:**
Generate EXACTLY 4 personalized wellness recommendations based on the mood patterns above.

**Requirements:**
1. Each recommendation must include:
   - title: Short, encouraging (3-6 words)
   - description: Empathetic, specific, actionable (15-25 words)
   - icon: Single emoji that fits the recommendation
   - link: One of [/meditation, /forum, /appointments, /crisis]

2. Tone Guidelines:
   - Use "you" and "your" (second person)
   - Be warm and supportive, not prescriptive
   - Validate feelings before suggesting action
   - Use phrases like: "It seems...", "Consider...", "You might find..."
   - Avoid: medical terminology, diagnosis language, commands

3. Pattern Analysis:
   - If stress/anxiety dominant → prioritize breathing/meditation
   - If sadness/depression patterns → suggest community/counseling
   - If high intensity (8-10) → include crisis awareness
   - If improving trend → celebrate progress
   - If declining trend → gentle intervention suggestions

4. Priority Marker:
   - Add "priority": true to ONLY ONE recommendation if:
     * Recent high-intensity negative emotions (7+)
     * Multiple consecutive stressful moods
     * Crisis-related keywords in notes

**Output Format (JSON ONLY):**
```json
[
  {{
    "title": "Your Title Here",
    "description": "Your empathetic description here.",
    "icon": "🌟",
    "link": "/meditation",
    "priority": false
  }},
  // ... 3 more recommendations
]
```

**Important:**
- Return ONLY valid JSON array (no markdown, no explanation)
- Exactly 4 recommendations
- Each description should feel personal to their mood pattern
- Balance urgency with hope and encouragement

Generate recommendations now:"""
        
        # Call Gemini AI
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Clean up response (remove markdown code blocks if present)
        if response_text.startswith('```json'):
            response_text = response_text[7:]  # Remove ```json
        if response_text.startswith('```'):
            response_text = response_text[3:]  # Remove ```
        if response_text.endswith('```'):
            response_text = response_text[:-3]  # Remove ```
        
        # Parse JSON response
        ai_recommendations = json.loads(response_text.strip())
        
        # Validate structure
        if isinstance(ai_recommendations, list) and len(ai_recommendations) > 0:
            # Ensure all required fields exist
            for rec in ai_recommendations:
                if not all(key in rec for key in ['title', 'description', 'icon', 'link']):
                    print("Invalid recommendation structure from AI")
                    return None
            
            print(f"✨ AI generated {len(ai_recommendations)} personalized recommendations")
            return ai_recommendations
        
        return None
        
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {e}")
        print(f"Response: {response_text[:200]}")
        return None
    except Exception as e:
        print(f"AI recommendation generation error: {e}")
        return None

# Doctor Portal API Routes
@app.route('/api/doctor/appointments', methods=['GET'])
def get_doctor_appointments():
    """Get all appointments for doctor portal"""
    appointments = read_json('appointments.json')
    return jsonify(appointments)

@app.route('/api/doctor/appointments/<int:appointment_id>/schedule', methods=['POST'])
def schedule_appointment(appointment_id):
    """Schedule a meeting for an appointment"""
    appointments = read_json('appointments.json')
    data = request.json
    
    for apt in appointments:
        if apt.get('id') == appointment_id:
            apt['meetingType'] = data.get('meetingType')
            apt['scheduledDate'] = data.get('scheduledDate')
            apt['scheduledTime'] = data.get('scheduledTime')
            apt['duration'] = data.get('duration')
            apt['meetingLink'] = data.get('meetingLink')
            apt['doctorNotes'] = data.get('doctorNotes')
            apt['status'] = 'scheduled'
            break
    
    write_json('appointments.json', appointments)
    return jsonify({'success': True})

@app.route('/api/doctor/appointments/<int:appointment_id>/complete', methods=['POST'])
def complete_appointment(appointment_id):
    """Mark appointment as completed"""
    appointments = read_json('appointments.json')
    
    for apt in appointments:
        if apt.get('id') == appointment_id:
            apt['status'] = 'completed'
            break
    
    write_json('appointments.json', appointments)
    return jsonify({'success': True})

@app.route('/api/doctor/appointments/<int:appointment_id>/cancel', methods=['POST'])
def cancel_appointment(appointment_id):
    """Cancel an appointment"""
    appointments = read_json('appointments.json')
    
    for apt in appointments:
        if apt.get('id') == appointment_id:
            apt['status'] = 'cancelled'
            break
    
    write_json('appointments.json', appointments)
    return jsonify({'success': True})

if __name__ == '__main__':
    print(" MindfulCampus is starting...")
    print(" Open http://localhost:5000 in your browser")
    print(" AI-Powered Recommendations: Enabled (Gemini 2.5)")
    print(" Taking care of mental health, one student at a time\n")
    app.run(debug=True, port=5000)
