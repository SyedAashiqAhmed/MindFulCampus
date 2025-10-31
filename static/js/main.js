// MindfulCampus - Home Page JavaScript
// Mood tracking and recommendations

document.addEventListener('DOMContentLoaded', function() {
    // State
    let selectedMood = null;
    let selectedIntensity = 5;

    // Elements
    const moodButtons = document.querySelectorAll('.mood-btn');
    const intensitySlider = document.getElementById('intensitySlider');
    const intensityRange = document.getElementById('intensityRange');
    const intensityValue = document.getElementById('intensityValue');
    const moodNote = document.getElementById('moodNote');
    const submitMoodBtn = document.getElementById('submitMood');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    const dailyTip = document.getElementById('dailyTip');

    // Mood Selection
    moodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove previous selection
            moodButtons.forEach(b => b.classList.remove('selected'));
            
            // Select current mood
            this.classList.add('selected');
            selectedMood = {
                emoji: this.dataset.emoji,
                emotion: this.dataset.emotion
            };

            // Show intensity slider and note
            intensitySlider.style.display = 'block';
            moodNote.style.display = 'block';
            submitMoodBtn.style.display = 'block';

            // Add animation
            intensitySlider.classList.add('animate-slideDown');
            moodNote.classList.add('animate-slideDown');
        });
    });

    // Intensity Slider
    if (intensityRange) {
        intensityRange.addEventListener('input', function() {
            selectedIntensity = this.value;
            intensityValue.textContent = this.value;
        });
    }

    // Submit Mood
    if (submitMoodBtn) {
        submitMoodBtn.addEventListener('click', async function() {
            if (!selectedMood) {
                showFeedback('Please select a mood first', 'error');
                return;
            }

            const noteText = document.getElementById('noteText').value;

            try {
                const response = await fetch('/api/mood', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emoji: selectedMood.emoji,
                        emotion: selectedMood.emotion,
                        intensity: selectedIntensity,
                        note: noteText
                    })
                });

                const data = await response.json();
                
                if (data.success) {
                    showFeedback(data.message, 'success');
                    
                    // Reset form
                    setTimeout(() => {
                        resetMoodForm();
                        loadRecommendations();
                    }, 2000);
                } else {
                    showFeedback('Something went wrong. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showFeedback('Could not save mood. Please check your connection.', 'error');
            }
        });
    }

    // Load Recommendations
    async function loadRecommendations() {
        try {
            const response = await fetch('/api/recommendations');
            const recommendations = await response.json();

            recommendationsGrid.innerHTML = '';
            
            recommendations.forEach((rec, index) => {
                const recCard = document.createElement('div');
                recCard.className = 'glass-card recommendation-card hover-lift';
                if (rec.priority) {
                    recCard.classList.add('priority');
                }
                
                recCard.innerHTML = `
                    <div class="rec-icon">${rec.icon}</div>
                    <h3 class="rec-title">${rec.title}</h3>
                    <p class="rec-description">${rec.description}</p>
                `;
                
                recCard.style.animationDelay = `${index * 0.1}s`;
                recCard.classList.add('animate-fadeInUp');
                
                recCard.addEventListener('click', () => {
                    window.location.href = rec.link;
                });
                
                recommendationsGrid.appendChild(recCard);
            });
        } catch (error) {
            console.error('Error loading recommendations:', error);
        }
    }

    // Load Daily Tip
    function loadDailyTip() {
        const tips = [
            "Remember to take breaks between study sessions. Your mind needs rest to process information.",
            "Hydration affects your mood. Try drinking a glass of water right now! 💧",
            "5 minutes of deep breathing can reduce anxiety significantly. Give it a try!",
            "Reaching out for help is a sign of strength, not weakness. You're doing great.",
            "Small steps count. Even getting out of bed is an achievement worth celebrating.",
            "Your feelings are valid. It's okay to not be okay sometimes.",
            "Try the 5-4-3-2-1 grounding technique: 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.",
            "Sleep is crucial for mental health. Aim for 7-9 hours tonight.",
            "Physical movement helps mental health. A short walk can work wonders.",
            "You don't have to be productive every moment. Rest is productive too."
        ];

        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        dailyTip.textContent = randomTip;
        dailyTip.classList.add('animate-fadeIn');
    }

    // Show Feedback
    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-message ${type}`;
        feedbackMessage.classList.add('animate-slideDown');
    }

    // Reset Mood Form
    function resetMoodForm() {
        moodButtons.forEach(b => b.classList.remove('selected'));
        selectedMood = null;
        selectedIntensity = 5;
        intensityRange.value = 5;
        intensityValue.textContent = '5';
        document.getElementById('noteText').value = '';
        
        intensitySlider.style.display = 'none';
        moodNote.style.display = 'none';
        submitMoodBtn.style.display = 'none';
        
        setTimeout(() => {
            feedbackMessage.className = 'feedback-message';
        }, 3000);
    }

    // Initialize
    loadRecommendations();
    loadDailyTip();
});
