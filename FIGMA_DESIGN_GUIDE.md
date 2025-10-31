# 🎨 MindfulCampus - Figma Design Guide

## Complete Design Specifications for Figma Recreation

---

## 🎨 Design System

### **Color Palette**

#### Primary Colors
```
Primary Purple: #9333EA
- RGB: 147, 51, 234
- Used for: Main buttons, accents, links

Accent Pink: #EC4899
- RGB: 236, 72, 153
- Used for: Highlights, CTAs, important elements

Dark Background: #0F172A
- RGB: 15, 23, 42
- Used for: Main background
```

#### Secondary Colors
```
Glass Background: rgba(255, 255, 255, 0.05)
- Semi-transparent white overlay

Glass Strong: rgba(255, 255, 255, 0.1)
- Stronger glass effect for cards

Border Color: rgba(255, 255, 255, 0.1)
- Subtle borders
```

#### Text Colors
```
Primary Text: #FFFFFF (White)
Secondary Text: #D1D5DB (Gray-300)
Muted Text: #9CA3AF (Gray-400)
```

#### Status Colors
```
Success Green: #10B981
- RGB: 16, 185, 129

Warning Yellow: #F59E0B
- RGB: 245, 158, 11

Error Red: #EF4444
- RGB: 239, 68, 68

Info Blue: #3B82F6
- RGB: 59, 130, 246
```

---

## 📐 Layout Specifications

### **Grid System**
```
Container Max Width: 1280px (max-w-7xl)
Padding: 24px (p-6)
Gap: 24px (gap-6)

Responsive Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
```

### **Spacing Scale**
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

---

## 🎯 Component Specifications

### **1. Glass Card**
```
Background: rgba(255, 255, 255, 0.05)
Backdrop Filter: blur(10px)
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 24px
Padding: 24px
Shadow: 0 8px 32px rgba(0, 0, 0, 0.3)

Hover Effect:
- Transform: translateY(-4px)
- Shadow: 0 12px 48px rgba(0, 0, 0, 0.4)
- Transition: 0.3s ease
```

### **2. Primary Button**
```
Background: Linear Gradient
- From: #EC4899 (Accent)
- To: #9333EA (Primary)

Text: White (#FFFFFF)
Font Weight: Bold (700)
Padding: 16px 32px
Border Radius: 16px
Font Size: 16px

Hover Effect:
- Gradient reverses (From Primary to Accent)
- Transform: scale(1.05)
- Shadow: 0 8px 24px rgba(147, 51, 234, 0.4)
```

### **3. Status Badge**
```
Pending:
- Background: rgba(245, 158, 11, 0.2)
- Border: 2px solid #F59E0B
- Text: #FCD34D

Scheduled:
- Background: rgba(16, 185, 129, 0.2)
- Border: 2px solid #10B981
- Text: #6EE7B7

Completed:
- Background: rgba(59, 130, 246, 0.2)
- Border: 2px solid #3B82F6
- Text: #93C5FD

Cancelled:
- Background: rgba(239, 68, 68, 0.2)
- Border: 2px solid #EF4444
- Text: #FCA5A5

Size: Padding 8px 16px, Border Radius 9999px (full)
Font: 12px, Bold
```

### **4. Input Fields**
```
Background: rgba(255, 255, 255, 0.05)
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 12px
Padding: 16px
Text Color: White
Placeholder: rgba(255, 255, 255, 0.4)

Focus State:
- Border: 2px solid #EC4899
- Shadow: 0 0 0 3px rgba(236, 72, 153, 0.1)
```

### **5. Navigation Bar**
```
Position: Fixed top
Background: rgba(15, 23, 42, 0.8)
Backdrop Filter: blur(12px)
Height: 80px
Border Bottom: 1px solid rgba(255, 255, 255, 0.1)
Z-index: 50

Logo:
- Font Size: 24px
- Font Weight: Bold
- Gradient Text (Primary to Accent)

Nav Links:
- Font Size: 16px
- Padding: 12px 24px
- Hover: Background rgba(255, 255, 255, 0.1)
- Active: Background rgba(236, 72, 153, 0.2)
```

---

## 📱 Page Layouts

### **Home Page**

#### Hero Section
```
Height: 400px
Text Align: Center
Margin Bottom: 48px

Title:
- Font Size: 56px (desktop), 40px (mobile)
- Font Weight: Bold
- Line Height: 1.2
- Gradient Text (Primary to Accent)

Subtitle:
- Font Size: 20px
- Color: Gray-300
- Margin Top: 16px
```

#### Mood Tracker Section
```
Glass Card
Grid: 4 columns (desktop), 2 columns (mobile)
Gap: 24px

Mood Button:
- Size: 120px × 120px
- Border Radius: 24px
- Background: Glass
- Emoji Size: 48px
- Text Size: 14px
- Hover: Scale 1.1, Background rgba(236, 72, 153, 0.1)
```

#### Recommendations Grid
```
Grid: 4 columns (desktop), 2 (tablet), 1 (mobile)
Gap: 24px

Card:
- Glass Strong background
- Padding: 24px
- Border Radius: 16px
- Text Align: Center
- Icon Size: 48px
- Title: 20px, Bold
- Description: 14px, Gray-300
```

### **Doctor Portal**

#### Dashboard Stats
```
Grid: 4 columns (desktop), 2 (mobile)
Gap: 24px

Stat Card:
- Glass Strong
- Padding: 24px
- Border Radius: 16px
- Text Align: Center
- Icon: 32px
- Number: 36px, Bold, Colored
- Label: 12px, Gray-400
```

#### Appointment Card
```
Glass Strong
Padding: 24px
Border Radius: 16px
Margin Bottom: 24px

Layout:
- Flex Row (desktop), Column (mobile)
- Space Between

Patient Info:
- Avatar: 48px circle, Gradient background
- Name: 20px, Bold
- Email: 14px, Gray-400
- Phone: 14px, Gray-400

Details:
- Type Badge: 12px, Glass background
- Date/Time: 16px, Accent color
- Reason: 14px, Glass box, Padding 12px

Actions:
- Button Stack (vertical)
- Gap: 12px
```

### **Appointments Page**

#### Booking Form
```
Glass Strong Card
Padding: 32px
Border Radius: 24px
Max Width: 800px

Form Fields:
- Label: 14px, Medium weight, Margin Bottom 8px
- Input: Full width, 16px padding
- Gap between fields: 24px

Meeting Type Selector:
- Grid: 3 columns
- Gap: 16px
- Card Size: 120px × 120px
- Icon: 32px
- Text: 14px
- Selected: Border 2px Accent, Background Accent/10
```

### **Meditation Page**

#### Active Session Card
```
Glass Strong
Padding: 48px
Border Radius: 32px
Text Align: Center
Margin Bottom: 48px

Breathing Circle:
- Size: 200px
- Border: 4px solid Accent
- Border Radius: 50%
- Animation: Scale 1.0 to 1.2 (4s loop)
- Glow: 0 0 40px rgba(236, 72, 153, 0.5)

Controls:
- Play/Pause: 64px circle button
- Gradient background
- Icon: 24px
```

#### Exercise Grid
```
Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
Gap: 24px

Card:
- Glass background
- Padding: 24px
- Border Radius: 16px
- Hover: Lift effect
- Icon: 40px
- Title: 18px, Bold
- Description: 14px, Gray-300
- Duration: 12px, Accent color
```

---

## 🎭 Animations

### **Fade In**
```
Keyframes:
0%: opacity 0, transform translateY(20px)
100%: opacity 1, transform translateY(0)

Duration: 0.6s
Easing: ease-out
```

### **Hover Lift**
```
Transform: translateY(-4px)
Shadow: Increase by 50%
Duration: 0.3s
Easing: ease-in-out
```

### **Pulse (Priority Items)**
```
Keyframes:
0%, 100%: opacity 1
50%: opacity 0.7

Duration: 2s
Iteration: infinite
```

### **Float (Icons)**
```
Keyframes:
0%, 100%: transform translateY(0)
50%: transform translateY(-10px)

Duration: 3s
Iteration: infinite
Easing: ease-in-out
```

### **Gradient Animation**
```
Background: Linear gradient
Background Size: 200% 200%
Animation: Gradient shift

Keyframes:
0%: background-position 0% 50%
50%: background-position 100% 50%
100%: background-position 0% 50%

Duration: 3s
Iteration: infinite
```

---

## 🖼️ Icons & Emojis

### **Mood Icons**
```
😊 Happy - #10B981 (Green)
😰 Anxious - #F59E0B (Yellow)
😫 Stressed - #EF4444 (Red)
😢 Sad - #3B82F6 (Blue)
😌 Calm - #8B5CF6 (Purple)
😴 Tired - #6B7280 (Gray)
😤 Frustrated - #F97316 (Orange)
🤗 Grateful - #EC4899 (Pink)
```

### **Feature Icons**
```
🧘 Meditation
💬 Chat
📹 Video Call
🏥 In-Person
📅 Calendar
🌟 Priority
✨ AI-Powered
🆘 Emergency
```

---

## 📏 Typography

### **Font Family**
```
Primary: System UI fonts
- -apple-system
- BlinkMacSystemFont
- "Segoe UI"
- Roboto
- sans-serif
```

### **Font Sizes**
```
Heading 1: 56px (3.5rem) - Bold
Heading 2: 48px (3rem) - Bold
Heading 3: 36px (2.25rem) - Bold
Heading 4: 24px (1.5rem) - Bold
Heading 5: 20px (1.25rem) - Semibold
Body Large: 18px (1.125rem) - Regular
Body: 16px (1rem) - Regular
Body Small: 14px (0.875rem) - Regular
Caption: 12px (0.75rem) - Medium
```

### **Line Heights**
```
Tight: 1.2
Normal: 1.5
Relaxed: 1.75
```

---

## 🎨 Special Effects

### **Glassmorphism**
```
Background: rgba(255, 255, 255, 0.05)
Backdrop Filter: blur(10px)
Border: 1px solid rgba(255, 255, 255, 0.1)
Box Shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
```

### **Gradient Text**
```
Background: Linear Gradient
- From: #EC4899
- To: #9333EA
Background Clip: text
Text Fill Color: transparent
```

### **Glow Effect**
```
Box Shadow: 0 0 40px rgba(236, 72, 153, 0.5)
Animation: Pulse
```

### **Backdrop Blur**
```
Backdrop Filter: blur(12px)
- Used for: Navigation, Modals, Overlays
```

---

## 📱 Responsive Breakpoints

### **Mobile (< 768px)**
```
- Single column layouts
- Stacked navigation
- Full-width cards
- Larger touch targets (48px min)
- Reduced padding (16px)
```

### **Tablet (768px - 1024px)**
```
- 2 column grids
- Horizontal navigation
- Medium padding (24px)
```

### **Desktop (> 1024px)**
```
- 3-4 column grids
- Full navigation
- Maximum padding (32px)
- Hover effects enabled
```

---

## 🎯 Component States

### **Button States**
```
Default:
- Gradient background
- White text
- No shadow

Hover:
- Reversed gradient
- Scale 1.05
- Shadow added

Active:
- Scale 0.95
- Brightness 90%

Disabled:
- Opacity 50%
- Cursor not-allowed
- No hover effects
```

### **Input States**
```
Default:
- Glass background
- White border

Focus:
- Accent border (2px)
- Ring shadow

Error:
- Red border
- Red text below

Success:
- Green border
- Checkmark icon
```

---

## 📋 How to Use This in Figma

### **Step 1: Setup**
1. Create new Figma file
2. Set canvas to 1440px width
3. Create color styles from palette above
4. Create text styles from typography specs

### **Step 2: Components**
1. Create glass card component
2. Create button variants (Primary, Secondary, Danger)
3. Create input field component
4. Create status badge variants
5. Create navigation component

### **Step 3: Pages**
1. Create frames for each page (Home, Doctor Portal, etc.)
2. Use auto-layout for responsive design
3. Apply components
4. Add spacing using 8px grid

### **Step 4: Prototype**
1. Link buttons to pages
2. Add hover states
3. Create modal interactions
4. Add scroll animations

---

## 🎨 Figma Plugins to Use

### **Recommended:**
1. **Glassmorphism** - For glass effects
2. **Gradient Generator** - For gradient backgrounds
3. **Iconify** - For icons
4. **Auto Layout** - For responsive design
5. **Color Palettes** - To save color system

---

## 📸 Alternative: Screenshot Method

### **Quick Steps:**
```
1. Run your app: python run.py
2. Open each page in browser
3. Take full-page screenshots:
   - Home page
   - Doctor portal
   - Appointments
   - Meditation
   - Forum
   - Crisis

4. Import screenshots to Figma
5. Use as reference to recreate
6. Measure spacing with Figma tools
7. Extract colors with eyedropper
```

---

## 💡 Tips for Figma Recreation

1. **Use Auto Layout** - For responsive components
2. **Create Component Library** - Reusable elements
3. **Use Constraints** - For responsive behavior
4. **Layer Organization** - Name layers clearly
5. **Use Variants** - For button/badge states
6. **Prototype Interactions** - Show hover effects
7. **Use Plugins** - Speed up workflow

---

## 🎉 Summary

This guide contains:
- ✅ Complete color palette
- ✅ All component specifications
- ✅ Layout measurements
- ✅ Typography system
- ✅ Animation details
- ✅ Responsive breakpoints
- ✅ State variations
- ✅ Step-by-step recreation guide

**Use this to recreate the entire MindfulCampus design in Figma!** 🎨✨
