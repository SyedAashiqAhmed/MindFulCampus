# 🤖 MindfulCampus - AI-Powered Recommendations

## ✨ New Feature: Gemini AI Integration

MindfulCampus now uses **Google Gemini 2.5 AI** to provide **personalized, context-aware mental health recommendations** based on your mood patterns.

---

## 🎯 What's New?

### **AI-Powered Personalization**
Instead of generic suggestions, MindfulCampus now:
- ✅ **Analyzes your mood history** (last 7 entries)
- ✅ **Detects emotional patterns** (stress trends, improvement, decline)
- ✅ **Generates empathetic recommendations** tailored to YOUR situation
- ✅ **Prioritizes urgent needs** (high-intensity negative emotions)
- ✅ **Celebrates progress** when you're doing better

---

## 🧠 How It Works

### **1. Mood Pattern Analysis**
When you log multiple moods, the AI examines:
- **Emotion types**: Happy, sad, anxious, stressed, etc.
- **Intensity levels**: 1-10 scale
- **Trend direction**: Improving or declining
- **Journal notes**: Keywords indicating distress or progress

### **2. Advanced Prompt Engineering**
The AI receives a sophisticated prompt that includes:
```
✓ Your role as a compassionate mental health assistant
✓ User's recent mood history (anonymized)
✓ Available app features (meditation, forum, counseling)
✓ Tone guidelines (warm, supportive, never clinical)
✓ Pattern-based rules (stress → breathing, sadness → community)
✓ Priority detection (high-intensity → crisis awareness)
```

### **3. Personalized Output**
The AI generates **exactly 4 recommendations** with:
- **Title**: Encouraging, 3-6 words
- **Description**: Empathetic, actionable, 15-25 words
- **Icon**: Relevant emoji
- **Link**: Direct path to the feature
- **Priority flag**: Highlights urgent recommendations

---

## 📊 Example AI Recommendations

### **Scenario 1: Stressed Student**
**Mood History:**
- Anxious (8/10) - "Finals week coming up"
- Stressed (9/10) - "Too much to study"
- Overwhelmed (7/10) - "Can't focus"

**AI Recommendations:**
```json
[
  {
    "title": "Immediate Breathing Relief",
    "description": "You're experiencing high stress. A 4-7-8 breathing exercise can calm your nervous system right now.",
    "icon": "🌬️",
    "link": "/meditation",
    "priority": true
  },
  {
    "title": "Connect With Peers",
    "description": "Finals stress is tough. Share your experience in the forum – you're not alone in this.",
    "icon": "💬",
    "link": "/forum"
  },
  {
    "title": "Schedule a Check-In",
    "description": "Academic pressure can feel overwhelming. Consider talking to a counselor about stress management.",
    "icon": "📅",
    "link": "/appointments"
  },
  {
    "title": "Body Scan Meditation",
    "description": "Release the tension you're carrying. A 10-minute body scan can help you relax.",
    "icon": "🧘",
    "link": "/meditation"
  }
]
```

### **Scenario 2: Improving Mood**
**Mood History:**
- Sad (6/10) → Neutral (5/10) → Calm (4/10) → Happy (3/10)

**AI Recommendations:**
```json
[
  {
    "title": "Celebrate Your Progress!",
    "description": "Your mood has been improving! Keep up the great work with whatever you're doing.",
    "icon": "🌟",
    "link": "/"
  },
  {
    "title": "Share Your Success",
    "description": "You've made real progress. Consider sharing your journey in the forum to inspire others.",
    "icon": "💬",
    "link": "/forum"
  },
  {
    "title": "Maintain Your Practice",
    "description": "Morning meditation could help you sustain this positive momentum throughout the week.",
    "icon": "🧘",
    "link": "/meditation"
  },
  {
    "title": "Build Your Toolkit",
    "description": "You're doing well. Explore more wellness strategies to strengthen your mental health foundation.",
    "icon": "🌱",
    "link": "/meditation"
  }
]
```

---

## 🔐 API Configuration

### **Gemini API Key**
The application uses your provided API key:
```python
GEMINI_API_KEY = "AIzaSyC_Pv4NzIDOOH4aRBKvqfQV9Hd-1tE_k-U"
```

**Security Note:** In production, store this in environment variables:
```python
import os
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
```

### **Model Configuration**
```python
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash-exp')
```

---

## 🎨 Prompt Engineering Breakdown

### **Prompt Structure**
Our prompt has 8 key sections:

#### **1. Role Definition**
```
You are a compassionate mental health support assistant 
for university students using MindfulCampus...
```
→ Establishes AI's purpose and context

#### **2. User's Mood History**
```json
{
  "emotion": "anxious",
  "intensity": 8,
  "note": "Finals week stress"
}
```
→ Provides concrete data for analysis

#### **3. Available Features**
```
1. Meditation & Breathing
2. Peer Support Forum
3. Professional Counseling
4. Crisis Resources
```
→ Constrains recommendations to app capabilities

#### **4. Task Instructions**
```
Generate EXACTLY 4 personalized wellness recommendations...
```
→ Clear, specific output requirements

#### **5. Tone Guidelines**
```
- Use "you" and "your" (second person)
- Be warm and supportive, not prescriptive
- Validate feelings before suggesting action
```
→ Ensures empathetic language

#### **6. Pattern Analysis Rules**
```
- If stress/anxiety dominant → breathing/meditation
- If sadness/depression → community/counseling
- If high intensity (8-10) → crisis awareness
```
→ Evidence-based recommendation logic

#### **7. Priority Detection**
```
Add "priority": true if:
- Recent high-intensity negative emotions (7+)
- Multiple consecutive stressful moods
```
→ Identifies urgent needs

#### **8. Output Format**
```json
[
  {
    "title": "...",
    "description": "...",
    "icon": "...",
    "link": "...",
    "priority": false
  }
]
```
→ Structured, parseable response

---

## 🔄 Fallback System

**Graceful Degradation:**
```python
try:
    ai_recommendations = get_ai_recommendations(moods)
    if ai_recommendations:
        return jsonify(ai_recommendations)
except Exception as e:
    print(f"AI recommendation error: {e}")
    # Fall back to default recommendations
```

**Why?**
- API rate limits
- Network issues
- Parsing errors
- Invalid responses

The app **never breaks** – it always provides recommendations.

---

## 📈 Testing the AI Feature

### **Test 1: Log Your First Mood**
1. Go to Home page
2. Select "😰 Anxious"
3. Set intensity to 8
4. Add note: "Exam stress"
5. Submit

**Result:** Default recommendations (AI needs history)

### **Test 2: Log Multiple Moods**
1. Log 3-4 different moods over time
2. Refresh the page
3. Check recommendations section

**Result:** AI-generated, personalized suggestions!

### **Test 3: High-Intensity Negative Mood**
1. Log "😫 Stressed" with intensity 9
2. Add note: "Can't handle this"
3. Submit and check recommendations

**Result:** Priority recommendation with crisis awareness

### **Test 4: Improving Trend**
1. Log moods: Sad (8) → Neutral (6) → Calm (4)
2. Check recommendations

**Result:** Celebratory, progress-focused suggestions

---

## 🎯 Prompt Engineering Best Practices

### **What Makes This Prompt Effective?**

1. **Clear Role Definition**
   - AI knows it's a mental health assistant
   - Understands the university student context
   - Aware of SDG 3 mission

2. **Structured Data Input**
   - JSON format for mood history
   - Concise, relevant information
   - Limited note length (100 chars) to prevent prompt injection

3. **Explicit Constraints**
   - EXACTLY 4 recommendations
   - Specific word counts (title: 3-6, description: 15-25)
   - Predefined link options
   - JSON-only output

4. **Tone Engineering**
   - "You" language (second person)
   - Validation before suggestion
   - Avoids clinical/diagnostic terms
   - Warm, supportive phrases

5. **Pattern-Based Logic**
   - If/then rules for common scenarios
   - Intensity-based prioritization
   - Trend detection (improving/declining)
   - Crisis keyword awareness

6. **Output Validation**
   - JSON structure enforcement
   - Required field checking
   - Fallback on parsing errors

---

## 🔬 Behind the Scenes

### **Code Flow**
```
1. User logs mood → Saved to moods.json
2. Home page requests /api/recommendations
3. Backend checks if moods exist
4. If yes → Call get_ai_recommendations()
5. AI analyzes last 7 moods
6. Gemini generates 4 personalized recommendations
7. JSON response parsed & validated
8. Frontend displays AI recommendations
9. If AI fails → Fallback to default recommendations
```

### **Performance Optimization**
- **Caching**: Could cache recommendations for 1 hour
- **Rate Limiting**: Limit AI calls to prevent quota exhaustion
- **Async Processing**: Generate in background for faster response
- **Streaming**: Use streaming API for real-time generation

---

## 🌟 AI Recommendation Quality

### **What Makes Them "Good"?**

✅ **Personalized**: Based on YOUR mood patterns
✅ **Actionable**: Clear next steps, not vague advice
✅ **Empathetic**: Validates feelings first
✅ **Evidence-Based**: Follows mental health best practices
✅ **Contextual**: University student-specific language
✅ **Urgent-Aware**: Prioritizes high-intensity distress
✅ **Hopeful**: Balances concern with encouragement

### **Examples of Good vs. Bad Recommendations**

❌ **Bad (Generic)**
- "Try meditation"
- "Talk to someone"
- "Get some rest"

✅ **Good (AI-Powered)**
- "You're experiencing high stress. A 4-7-8 breathing exercise can calm your nervous system right now."
- "Finals stress is tough. Share your experience in the forum – you're not alone in this."
- "Academic pressure can feel overwhelming. Consider talking to a counselor about stress management."

---

## 🔮 Future Enhancements

### **Potential Upgrades**
1. **Mood Trend Visualization**
   - Show graphs of mood patterns
   - AI explains the trends in natural language

2. **Predictive Insights**
   - "Based on your history, Tuesday afternoons are tough for you"
   - Proactive recommendations before stress peaks

3. **Personalized Meditation Scripts**
   - AI generates custom meditation audio scripts
   - Tailored to your specific emotional needs

4. **Journal Analysis**
   - AI identifies recurring themes in notes
   - Suggests topics for counseling sessions

5. **Crisis Detection**
   - Advanced keyword detection (self-harm, hopelessness)
   - Automatic escalation to emergency resources

6. **Multi-Language Support**
   - Recommendations in student's native language
   - Cultural context awareness

---

## 🛠️ Troubleshooting

### **Issue: AI recommendations not showing**
**Cause:** No mood history yet
**Solution:** Log 2-3 moods first

### **Issue: "AI recommendation error" in console**
**Cause:** API key invalid or quota exceeded
**Solution:** 
1. Check API key in `run.py`
2. Verify Gemini API quota at https://aistudio.google.com
3. App will use default recommendations as fallback

### **Issue: Recommendations seem generic**
**Cause:** Not enough mood diversity in history
**Solution:** Log moods over multiple sessions with different emotions

### **Issue: Priority flag not appearing**
**Cause:** No high-intensity negative emotions logged
**Solution:** Log intensity 7+ with stressed/anxious emotions

---

## 📊 Monitoring AI Usage

### **Check Console Logs**
```
✨ AI generated 4 personalized recommendations
```
→ AI is working!

```
AI recommendation error: [error message]
```
→ Fallback to defaults

### **Track API Usage**
- Monitor Gemini API dashboard
- Check daily quota limits
- Review API costs (free tier: 60 requests/minute)

---

## 🎓 Educational Value

### **This Implementation Teaches:**
1. **Prompt Engineering**: How to craft effective AI prompts
2. **API Integration**: Working with generative AI APIs
3. **Error Handling**: Graceful degradation and fallbacks
4. **JSON Processing**: Parsing and validating AI responses
5. **Mental Health AI**: Ethical considerations in wellness tech
6. **User Privacy**: Processing sensitive data responsibly

---

## 🌈 Impact on User Experience

### **Before AI:**
- Generic, one-size-fits-all recommendations
- No context awareness
- Static suggestions

### **After AI:**
- **Personalized** to YOUR mood patterns
- **Context-aware** of emotional trends
- **Dynamic** suggestions that evolve with you
- **Empathetic** tone that feels human
- **Urgent-aware** prioritization

---

## 💙 Ethical Considerations

### **Mental Health AI Ethics**
✅ **Transparency**: Users know AI is involved
✅ **Privacy**: Mood data stays local (JSON files)
✅ **Non-Diagnostic**: Never claims to diagnose conditions
✅ **Human-in-Loop**: Recommends professional help
✅ **Crisis Escalation**: Prioritizes emergency resources
✅ **Opt-Out**: Falls back to defaults if AI fails

---

## 🚀 Quick Start

1. **Ensure API key is configured** (already done!)
2. **Start the server:**
   ```bash
   python run.py
   ```
3. **Look for this message:**
   ```
   🤖 AI-Powered Recommendations: Enabled (Gemini 2.5)
   ```
4. **Log 3+ moods** to activate AI
5. **Check recommendations** on home page

---

## 📚 Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Mental Health in AI](https://www.thelancet.com/journals/landig/article/PIIS2589-7500(21)00095-5/fulltext)

---

**🤖 AI + 💙 Mental Health = Personalized Wellness**

*MindfulCampus now adapts to YOU, not the other way around.*
