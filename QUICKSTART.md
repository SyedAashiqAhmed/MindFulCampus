# 🚀 MindfulCampus - Quick Start Guide

## Start the Application

### Option 1: Double-click Run (Windows)
1. Navigate to `E:/hackkkkto/MindfulCampus`
2. Double-click `run.py`
3. Open browser to `http://localhost:5000`

### Option 2: Command Line
```bash
cd E:/hackkkkto/MindfulCampus
python run.py
```

Then open: **http://localhost:5000**

---

## 📱 Quick Feature Tour

### 1️⃣ **Home Page** (Mood Tracking)
- Click an emoji to log your mood
- Slide the intensity bar (1-10)
- Add optional notes
- Click "Save My Mood"
- Get personalized recommendations

### 2️⃣ **Meditation Page**
- Choose a breathing exercise or guided meditation
- Click to start session
- Press play ▶ button
- Follow the breathing circle
- Complete session for affirmation

### 3️⃣ **Crisis Page** 🆘
- **Emergency button** always visible (bottom-right corner)
- One-tap call to helplines
- Start immediate breathing exercise
- Access 24/7 resources

### 4️⃣ **Forum Page**
- Share your thoughts anonymously
- Add tags (Stress, Anxiety, Success, etc.)
- Support others with 💙 button
- Read community posts

### 5️⃣ **Appointments Page**
- Fill in your details
- Select session type
- Choose date & time
- Submit to schedule
- View upcoming appointments

---

## 🎨 Design Highlights to Notice

✨ **Glassmorphism**: Frosted glass cards throughout  
🌊 **Gradients**: Smooth color transitions  
💫 **Animations**: Calming hover and transition effects  
🎯 **Emergency FAB**: Always-visible crisis button (bottom-right)  
🌈 **Color Psychology**: Deep blues for calm, teal for healing  

---

## 🛠️ Troubleshooting

### Port Already in Use
If you see "Address already in use":
```bash
# Stop existing Python processes
# Or change port in run.py:
app.run(debug=True, port=5001)  # Use different port
```

### CSS Not Loading
- Check that files are in `static/css/` folder
- Hard refresh: `Ctrl + Shift + R` (Windows)
- Clear browser cache

### Data Not Saving
- Check that `data/` folder exists
- Verify JSON files have write permissions
- Forum posts & appointments use `localStorage` (browser)

---

## 📊 Testing Scenarios

### Test Mood Tracking
1. Select "😰 Anxious"
2. Set intensity to 8
3. Add note: "Finals week stress"
4. Submit → Should see success message
5. Check recommendations update

### Test Breathing Exercise
1. Go to Meditation page
2. Click "4-7-8 Breathing"
3. Press Play
4. Watch circle expand/contract
5. Observe countdown timer

### Test Crisis Features
1. Click red 🆘 button (bottom-right)
2. Click "Start Breathing Exercise"
3. Follow on-screen breathing
4. Press Stop or ESC to exit

### Test Forum
1. Write a post
2. Select a tag
3. Submit
4. See it appear at top
5. Click 💙 Support button

### Test Appointments
1. Fill form with future date
2. Submit
3. See confirmation
4. Check "Upcoming Appointments"
5. Click Cancel to test removal

---

## 💡 Pro Tips

- **Daily Use**: Check mood every morning and evening
- **Stress Relief**: Use 4-7-8 breathing during study breaks
- **Community**: Post wins, not just struggles
- **Counseling**: Don't hesitate to schedule professional help
- **Crisis**: Emergency button is there for a reason - use it

---

## 📁 Key Files

```
run.py                  → Flask backend
templates/index.html    → Home page
static/css/style.css   → Main stylesheet
static/js/main.js      → Home page logic
data/moods.json        → Stored mood entries
```

---

## 🌐 Browser Compatibility

✅ Chrome/Edge (Recommended)  
✅ Firefox  
✅ Safari  
⚠️ IE11 (Limited support)

---

## 🔒 Privacy Note

- All mood data stored in `data/moods.json` (local only)
- Forum posts not persisted (demonstration only)
- Appointments saved in browser `localStorage`
- No external tracking or analytics
- No personal data sent to servers

---

## ❤️ Emergency Resources (Real)

🇺🇸 **US Crisis Resources:**
- **988** - Suicide & Crisis Lifeline
- **Text HOME to 741741** - Crisis Text Line
- **1-800-273-8255** - National Suicide Prevention

🌍 **International:**
- Visit: https://www.iasp.info/resources/Crisis_Centres/

---

**Need Help?** Check the main README.md for detailed documentation.

**💙 Take care of yourself. You matter.**
