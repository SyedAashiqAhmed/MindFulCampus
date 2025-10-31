# 🌸 MindfulCampus

**A Mental Health & Wellness Web App for University Students**

Supporting **SDG 3: Good Health and Well-being**

## ✨ NEW: Premium UI with 3D Effects & Animations!
🌸 Floating particles • 🎭 3D card tilts • 💫 Morphing shapes • ✨ Sparkle effects • 🌊 Liquid buttons • 🎯 Magnetic hover

---

## 💙 Purpose

MindfulCampus is a comprehensive mental health platform designed specifically for university students to manage stress, anxiety, and depression through a calm, privacy-focused digital space.

### Key Features

✨ **Daily Mood Tracking** - Emoji-based mood logging with intensity slider and optional journaling

🧘 **Guided Meditation & Breathing** - Multiple meditation sessions and breathing exercises (4-7-8, Box Breathing)

💬 **Peer Support Forum** - Safe, moderated community space for sharing experiences

🆘 **Crisis Intervention** - One-tap access to emergency helplines and immediate calming exercises

📊 **Personalized Recommendations** - Wellness suggestions based on mood patterns

📅 **Counseling Appointments** - Easy scheduling with professional counselors and email reminders

---

## 🎨 Design Philosophy

### Emotional Design Principles
- **Calming Color Palette**: Deep blue/indigo backgrounds with teal accents
- **Glassmorphism UI**: Modern frosted glass effects with gentle shadows
- **Smooth Animations**: Calming transitions that reduce anxiety
- **Empathetic Microcopy**: Supportive messages like "You're doing great"
- **Accessibility First**: High contrast, large buttons, readable fonts

### Color Psychology
- **Deep Blue/Indigo**: Promotes calmness and trust
- **Teal**: Healing and emotional balance
- **Soft Gradients**: Visual comfort and reduced stress
- **No Harsh Colors**: Avoiding anxiety-inducing bright reds (except crisis context)

---

## 🚀 Getting Started

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. **Navigate to project directory**
```bash
cd E:/hackkkkto/MindfulCampus
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the application**
```bash
python run.py
```

4. **Open your browser**
```
http://localhost:5000
```

You should see:
```
🌟 MindfulCampus is starting...
📍 Open http://localhost:5000 in your browser
💙 Taking care of mental health, one student at a time
```

---

## 📁 Project Structure

```
MindfulCampus/
│
├── run.py                      # Flask application entry point
├── requirements.txt            # Python dependencies
├── README.md                   # This file
│
├── data/                       # JSON data storage
│   ├── moods.json             # Mood tracking data
│   ├── users.json             # User data (if needed)
│   └── escalations.json       # Crisis escalations
│
├── templates/                  # HTML templates
│   ├── index.html             # Home - Mood tracking
│   ├── meditation.html        # Meditation & breathing
│   ├── crisis.html            # Crisis intervention
│   ├── forum.html             # Peer support forum
│   └── appointments.html      # Counseling scheduling
│
└── static/
    ├── css/
    │   ├── base.css           # Core styles & variables
    │   ├── components.css     # Reusable components
    │   ├── pages.css          # Page-specific styles
    │   ├── animations.css     # Animation definitions
    │   └── style.css          # Main stylesheet (imports all)
    │
    └── js/
        ├── main.js            # Home page functionality
        ├── meditation.js      # Meditation controls
        ├── crisis.js          # Crisis breathing exercises
        ├── forum.js           # Forum interactions
        └── appointments.js    # Appointment scheduling
```

---

## 🌟 Features Overview

### 1. **Home - Mood Tracking + AI Recommendations** 🤖
- Select from 7 emotional states with emojis
- Rate intensity on 1-10 slider
- Optional journal notes (280 characters)
- Immediate feedback: "Great check-in! 🌟"
- **NEW: AI-Powered Personalized Recommendations** (Gemini 2.5)
  - Analyzes your mood patterns
  - Generates empathetic, context-aware suggestions
  - Prioritizes urgent needs automatically
  - Celebrates progress and improvement

### 2. **Meditation & Breathing**
- **Breathing Exercises**: 4-7-8 technique, Box Breathing
- **Guided Meditations**: Morning Calm, Body Scan, Sleep Preparation
- Visual progress circle with timer
- Live breathing animation guide
- Session duration: 3-15 minutes

### 3. **Crisis Intervention**
- Prominent red header with empathetic messaging
- **One-Tap Actions**:
  - Call 988 (Suicide Prevention Lifeline)
  - Text HOME to 741741 (Crisis Text Line)
  - Start immediate breathing exercise
- Full-screen emergency breathing overlay
- 24/7 helpline directory

### 4. **Peer Support Forum**
- Anonymous posting system
- Post categorization (Stress, Anxiety, Success, Gratitude, etc.)
- Community guidelines front and center
- Support reactions (💙 button)
- Moderation notice for safety

### 5. **Counseling Appointments**
- Session type selection (Individual, Group, Crisis, etc.)
- Date/time picker with validation
- Optional reason field (private)
- Email reminder preferences
- Upcoming appointments dashboard

---

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic, accessible markup
- **CSS3**: Advanced styling (glassmorphism, gradients, animations)
- **Vanilla JavaScript**: No frameworks - pure JS for fast performance

### Backend
- **Python Flask**: Lightweight web framework
- **JSON Storage**: File-based data persistence (no database needed)
- **Flask-CORS**: Cross-origin resource sharing
- **Google Gemini AI 2.5**: Advanced prompt engineering for personalized recommendations

### Design Features
- **Glassmorphism**: Frosted glass UI effects
- **CSS Grid & Flexbox**: Responsive layouts
- **Custom Animations**: Calming transitions
- **Color Psychology**: Therapeutic color choices

---

## 🎯 API Endpoints

### Mood Tracking
- `GET /api/mood` - Retrieve all mood entries
- `POST /api/mood` - Save new mood entry

### Recommendations (AI-Powered) 🤖
- `GET /api/recommendations` - Get AI-personalized wellness tips
  - Analyzes mood history using Gemini AI
  - Falls back to default recommendations if AI unavailable
  - Returns 4 personalized suggestions based on emotional patterns

### Crisis Resources
- `GET /api/crisis` - Fetch emergency helplines and resources

### Meditations
- `GET /api/meditations` - List all meditation sessions

---

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Clear 3px teal outlines
- **Large Touch Targets**: Minimum 44x44px buttons
- **High Contrast**: WCAG AA compliant
- **Screen Reader Labels**: ARIA labels throughout
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Readable Fonts**: Segoe UI, 16px base size

---

## 🔒 Privacy & Safety

- **No Personal Data Storage**: All data stored locally (localStorage/JSON)
- **Anonymous Forum**: No user identification required
- **Moderated Community**: Safety guidelines prominently displayed
- **Crisis Resources**: Professional helplines always accessible
- **Confidential Counseling**: Explicitly stated

---

## 🌍 SDG 3 Alignment

**Goal 3: Good Health and Well-being**
- **3.4**: Reduce premature mortality from non-communicable diseases through mental health support
- **3.5**: Strengthen prevention and treatment of substance abuse (stress reduction)
- **3.d**: Strengthen capacity for early warning and risk reduction (crisis intervention)

MindfulCampus directly addresses mental health challenges in university students, providing:
- Early intervention tools
- Accessible mental health resources
- Peer support networks
- Professional counseling access

---

## 🎨 Design Credits

### Color Palette
```css
Primary Background: #0f1729 (Deep Space Blue)
Secondary Background: #1a2332 (Midnight Blue)
Accent Teal: #4fd1c5 (Healing Teal)
Accent Purple: #9f7aea (Calming Purple)
Accent Blue: #63b3ed (Trust Blue)
```

### Gradients
- **Main**: Purple to Deep Purple (`#667eea` → `#764ba2`)
- **Calm**: Teal to Blue (`#4fd1c5` → `#63b3ed`)
- **Ocean**: Light Blue to Cyan (`#4facfe` → `#00f2fe`)

---

## 📝 Usage Tips

1. **Track Your Mood Daily**: Regular check-ins help identify patterns and activate AI personalization
2. **Log Multiple Moods**: AI needs 2-3 entries to generate personalized recommendations
3. **Try Breathing First**: 3 minutes can significantly reduce anxiety
4. **Join the Community**: You're not alone in your struggles
5. **Schedule Counseling**: Professional help is always available
6. **Use Crisis Resources**: No shame in asking for immediate help
7. **Check AI Recommendations**: Each suggestion is tailored to YOUR emotional patterns

---

## 🤝 Contributing

This project is designed for educational purposes and university wellness programs. Feel free to:
- Customize the color scheme
- Add more meditation sessions
- Enhance forum features
- Integrate with campus counseling systems
- Experiment with AI prompts for better recommendations
- Train custom models on anonymized mood data

## 🤖 AI Features

This app now includes **Gemini AI-powered recommendations**! See:
- **AI_FEATURES.md** - Complete guide to prompt engineering and AI integration
- **AI_DEMO.md** - Step-by-step demo to test AI recommendations

**Key AI Capabilities:**
- Pattern recognition (stress trends, improvement detection)
- Empathetic language generation
- Crisis priority detection
- Progress celebration
- Context-aware suggestions

---

## 📧 Support

For technical issues or suggestions:
- Review the code comments for guidance
- Check browser console for errors
- Ensure Python/Flask is running correctly

---

## ❤️ Acknowledgments

Built with care for university students everywhere who deserve accessible, compassionate mental health support.

**Remember**: Your mental health matters. You're not alone. Help is always available.

---

## 📜 License

This project is created for educational purposes supporting SDG 3: Good Health and Well-being.

---

**💙 MindfulCampus** - *One breath at a time.*
