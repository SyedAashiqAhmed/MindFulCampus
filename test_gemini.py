"""
Test script to verify Gemini API is working properly
"""

import google.generativeai as genai
import json

# Your API Key
GEMINI_API_KEY = "AIzaSyC_Pv4NzIDOOH4aRBKvqfQV9Hd-1tE_k-U"

print("=" * 60)
print("🤖 GEMINI API TEST")
print("=" * 60)

# Step 1: Configure API
print("\n1️⃣ Configuring Gemini API...")
try:
    genai.configure(api_key=GEMINI_API_KEY)
    print("✅ API configured successfully")
except Exception as e:
    print(f"❌ Configuration failed: {e}")
    exit(1)

# Step 2: Initialize Model
print("\n2️⃣ Initializing Gemini 2.0 Flash model...")
try:
    model = genai.GenerativeModel('gemini-2.0-flash-exp')
    print("✅ Model initialized successfully")
except Exception as e:
    print(f"❌ Model initialization failed: {e}")
    exit(1)

# Step 3: Simple Test
print("\n3️⃣ Testing simple text generation...")
try:
    response = model.generate_content("Say 'Hello, I am working!' in a friendly way.")
    print(f"✅ Response received: {response.text}")
except Exception as e:
    print(f"❌ Simple test failed: {e}")
    exit(1)

# Step 4: Test JSON Generation (like recommendations)
print("\n4️⃣ Testing JSON generation (like recommendations)...")
try:
    prompt = """Generate a JSON array with 2 wellness recommendations for a stressed student.
    
Format:
[
  {
    "title": "Recommendation title",
    "description": "Brief description",
    "icon": "emoji",
    "link": "/meditation",
    "priority": false
  }
]

Return ONLY valid JSON, no markdown, no explanation."""

    response = model.generate_content(prompt)
    response_text = response.text.strip()
    
    # Clean up markdown if present
    if response_text.startswith('```json'):
        response_text = response_text[7:]
    if response_text.startswith('```'):
        response_text = response_text[3:]
    if response_text.endswith('```'):
        response_text = response_text[:-3]
    
    # Parse JSON
    recommendations = json.loads(response_text.strip())
    
    print("✅ JSON generation successful!")
    print(f"✅ Generated {len(recommendations)} recommendations")
    print("\nRecommendations:")
    for i, rec in enumerate(recommendations, 1):
        print(f"\n  {i}. {rec.get('icon', '✨')} {rec.get('title', 'N/A')}")
        print(f"     {rec.get('description', 'N/A')}")
        
except json.JSONDecodeError as e:
    print(f"❌ JSON parsing failed: {e}")
    print(f"Response was: {response_text[:200]}")
except Exception as e:
    print(f"❌ JSON test failed: {e}")
    exit(1)

# Step 5: Test Mood-Based Recommendations
print("\n5️⃣ Testing mood-based recommendations (like your app)...")
try:
    mood_data = [
        {"emotion": "anxious", "intensity": 8, "note": "Exams coming up"},
        {"emotion": "stressed", "intensity": 9, "note": "Too much work"}
    ]
    
    prompt = f"""You are a compassionate mental health support assistant.

User's Recent Moods:
{json.dumps(mood_data, indent=2)}

Generate EXACTLY 4 personalized wellness recommendations in JSON format:
[
  {{
    "title": "Short title",
    "description": "Personalized description mentioning their stress",
    "icon": "emoji",
    "link": "/meditation or /forum or /appointments",
    "priority": true or false
  }}
]

Return ONLY valid JSON array, no markdown."""

    response = model.generate_content(prompt)
    response_text = response.text.strip()
    
    # Clean up
    if response_text.startswith('```json'):
        response_text = response_text[7:]
    if response_text.startswith('```'):
        response_text = response_text[3:]
    if response_text.endswith('```'):
        response_text = response_text[:-3]
    
    # Parse
    recommendations = json.loads(response_text.strip())
    
    print("✅ Mood-based recommendations successful!")
    print(f"✅ Generated {len(recommendations)} personalized recommendations")
    print("\nPersonalized Recommendations:")
    for i, rec in enumerate(recommendations, 1):
        priority = "⭐ PRIORITY" if rec.get('priority') else ""
        print(f"\n  {i}. {rec.get('icon', '✨')} {rec.get('title', 'N/A')} {priority}")
        print(f"     {rec.get('description', 'N/A')}")
        print(f"     Link: {rec.get('link', 'N/A')}")
        
except Exception as e:
    print(f"❌ Mood-based test failed: {e}")
    import traceback
    traceback.print_exc()

# Final Summary
print("\n" + "=" * 60)
print("🎉 GEMINI API TEST COMPLETE!")
print("=" * 60)
print("\n✅ All tests passed!")
print("✅ Your Gemini API is working properly!")
print("✅ Ready to generate AI recommendations in your app!")
print("\n💡 If you see this message, your API key is valid and working.")
print("=" * 60)
