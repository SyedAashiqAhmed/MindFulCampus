// MindfulCampus - Tailwind Version JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOOD TRACKING ==========
    const moodButtons = document.querySelectorAll('.mood-btn');
    const intensitySection = document.getElementById('intensitySection');
    const noteSection = document.getElementById('noteSection');
    const submitButton = document.getElementById('submitMood');
    const intensitySlider = document.getElementById('intensitySlider');
    const intensityValue = document.getElementById('intensityValue');
    const moodNote = document.getElementById('moodNote');
    const feedbackMessage = document.getElementById('feedbackMessage');
    
    let selectedMood = null;
    let selectedEmotion = null;

    // Mood button click handler
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove previous selection
            moodButtons.forEach(btn => {
                btn.classList.remove('selected', 'bg-accent/20', 'border-accent', 'scale-110');
                btn.classList.add('border-transparent');
            });
            
            // Select current
            this.classList.add('selected', 'bg-accent/20', 'border-accent');
            this.classList.remove('border-transparent');
            
            selectedMood = this.dataset.mood;
            selectedEmotion = this.dataset.mood;
            
            // Show intensity slider with animation
            intensitySection.classList.remove('hidden');
            setTimeout(() => {
                noteSection.classList.remove('hidden');
                submitButton.classList.remove('hidden');
            }, 300);
        });
    });

    // Intensity slider handler
    if (intensitySlider) {
        intensitySlider.addEventListener('input', function() {
            intensityValue.textContent = this.value;
        });
    }

    // Submit mood handler
    if (submitButton) {
        submitButton.addEventListener('click', async function() {
            if (!selectedMood) {
                showFeedback('Please select a mood first', 'error');
                return;
            }

            const moodData = {
                emoji: selectedMood,
                emotion: selectedEmotion,
                intensity: parseInt(intensitySlider.value),
                note: moodNote.value.trim()
            };

            try {
                const response = await fetch('/api/mood', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(moodData)
                });

                const data = await response.json();
                
                if (data.success) {
                    showFeedback('Great check-in! 🌟 Your mood has been logged.', 'success');
                    
                    // Reset form after 2 seconds
                    setTimeout(() => {
                        resetForm();
                        loadRecommendations(); // Reload AI recommendations
                    }, 2000);
                }
            } catch (error) {
                console.error('Error:', error);
                showFeedback('Could not log mood. Please try again.', 'error');
            }
        });
    }

    // Show feedback message
    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `mt-6 p-4 rounded-2xl text-center font-medium animate-fade-in ${
            type === 'success' 
                ? 'bg-green-500/20 border-2 border-green-500 text-green-300' 
                : 'bg-red-500/20 border-2 border-red-500 text-red-300'
        }`;
        feedbackMessage.classList.remove('hidden');
        
        setTimeout(() => {
            feedbackMessage.classList.add('hidden');
        }, 5000);
    }

    // Reset form
    function resetForm() {
        moodButtons.forEach(btn => {
            btn.classList.remove('selected', 'bg-accent/20', 'border-accent');
            btn.classList.add('border-transparent');
        });
        
        intensitySection.classList.add('hidden');
        noteSection.classList.add('hidden');
        submitButton.classList.add('hidden');
        
        intensitySlider.value = 5;
        intensityValue.textContent = '5';
        moodNote.value = '';
        selectedMood = null;
        selectedEmotion = null;
    }

    // ========== LOAD RECOMMENDATIONS ==========
    async function loadRecommendations() {
        const grid = document.getElementById('recommendationsGrid');
        const status = document.getElementById('recommendationsStatus');
        
        try {
            status.textContent = '🤖 Loading AI recommendations...';
            status.className = 'mt-4 text-center text-sm text-accent';
            
            const response = await fetch('/api/recommendations');
            const recommendations = await response.json();
            
            grid.innerHTML = '';
            
            // Check if these are AI-generated (they'll have more personalized language)
            const isAI = recommendations.some(rec => 
                rec.description.includes('you') || 
                rec.description.includes('your') ||
                rec.priority === true
            );
            
            if (isAI) {
                status.textContent = '✨ AI-powered personalized recommendations';
                status.className = 'mt-4 text-center text-sm text-green-400';
            } else {
                status.textContent = '📋 Default recommendations (log moods for AI personalization)';
                status.className = 'mt-4 text-center text-sm text-gray-400';
            }
            
            recommendations.forEach((rec, index) => {
                const card = document.createElement('a');
                card.href = rec.link || '#';
                card.className = `glass-strong rounded-2xl p-6 hover-lift cursor-pointer transition-all duration-300 ${
                    rec.priority ? 'border-2 border-accent animate-pulse-slow' : ''
                }`;
                card.style.animationDelay = `${index * 0.1}s`;
                
                card.innerHTML = `
                    <div class="text-center">
                        <div class="text-5xl mb-4 animate-float">${rec.icon || '✨'}</div>
                        <h3 class="text-xl font-bold mb-3">${rec.title}</h3>
                        <p class="text-gray-300 text-sm leading-relaxed">${rec.description}</p>
                        ${rec.priority ? '<div class="mt-4 text-accent font-bold text-sm">⭐ Priority</div>' : ''}
                    </div>
                `;
                
                grid.appendChild(card);
            });
            
            console.log('✅ Loaded recommendations:', recommendations);
        } catch (error) {
            console.error('❌ Error loading recommendations:', error);
            status.textContent = '⚠️ Could not load recommendations';
            status.className = 'mt-4 text-center text-sm text-red-400';
        }
    }
    
    // Refresh recommendations button
    const refreshBtn = document.getElementById('refreshRecommendations');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.textContent = '⏳ Loading...';
            loadRecommendations().then(() => {
                refreshBtn.textContent = '🔄 Refresh AI';
            });
        });
    }

    // ========== LOAD DAILY TIP ==========
    async function loadDailyTip() {
        const tips = [
            "Remember to take breaks between study sessions. Your mind needs rest to process information.",
            "Practice gratitude by writing down three things you're thankful for today.",
            "Take a 5-minute walk outside. Fresh air and movement can boost your mood significantly.",
            "Stay hydrated! Drinking water helps maintain focus and reduces stress.",
            "Connect with a friend today. Social support is crucial for mental wellness.",
            "Try the 4-7-8 breathing technique: Breathe in for 4, hold for 7, exhale for 8.",
            "Set small, achievable goals for today. Celebrate each accomplishment!",
            "Limit screen time before bed. Better sleep means better mental health.",
            "Practice self-compassion. Treat yourself with the same kindness you'd show a friend.",
            "Take 10 minutes for meditation or mindfulness. Even brief sessions help."
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        document.getElementById('dailyTip').textContent = randomTip;
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ========== INITIALIZE ==========
    loadRecommendations();
    loadDailyTip();
    
    // Add fade-in animation to elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hover-lift').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });

    console.log('✨ MindfulCampus Tailwind version loaded!');
});
