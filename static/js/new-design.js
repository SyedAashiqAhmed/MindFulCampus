// MindfulCampus - New Design JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOOD TRACKING ==========
    const moodButtons = document.querySelectorAll('.mood-emoji-btn');
    const logMoodBtn = document.getElementById('logMoodBtn');
    let selectedMood = null;

    moodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove previous selection
            moodButtons.forEach(b => b.classList.remove('selected'));
            
            // Select current
            this.classList.add('selected');
            selectedMood = this.dataset.mood;
            
            // Enable log button
            logMoodBtn.style.opacity = '1';
        });
    });

    if (logMoodBtn) {
        logMoodBtn.addEventListener('click', async function() {
            if (!selectedMood) {
                alert('Please select a mood first');
                return;
            }

            try {
                const response = await fetch('/api/mood', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        emoji: selectedMood,
                        emotion: selectedMood,
                        intensity: 5,
                        note: ''
                    })
                });

                const data = await response.json();
                
                if (data.success) {
                    // Show success
                    logMoodBtn.textContent = '✓ Logged!';
                    logMoodBtn.style.background = '#66bb6a';
                    
                    setTimeout(() => {
                        logMoodBtn.textContent = 'Log mood';
                        logMoodBtn.style.background = '';
                        moodButtons.forEach(b => b.classList.remove('selected'));
                        selectedMood = null;
                    }, 2000);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Could not log mood. Please try again.');
            }
        });
    }

    // ========== MEDITATION PLAYER ==========
    const playButton = document.getElementById('playButton');
    const playIcon = playButton?.querySelector('.play-icon');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    
    let isPlaying = false;
    let currentTime = 0;
    let totalTime = 300; // 5 minutes in seconds
    let interval = null;

    if (playButton) {
        playButton.addEventListener('click', function() {
            if (isPlaying) {
                pauseSession();
            } else {
                playSession();
            }
        });
    }

    function playSession() {
        isPlaying = true;
        playIcon.textContent = '⏸';
        playButton.style.background = 'rgba(38, 198, 218, 0.3)';
        
        interval = setInterval(() => {
            currentTime++;
            updateProgress();
            
            if (currentTime >= totalTime) {
                completeSession();
            }
        }, 1000);
    }

    function pauseSession() {
        isPlaying = false;
        playIcon.textContent = '▶';
        playButton.style.background = '';
        clearInterval(interval);
    }

    function completeSession() {
        pauseSession();
        currentTime = 0;
        updateProgress();
        playIcon.textContent = '✓';
        
        setTimeout(() => {
            playIcon.textContent = '▶';
        }, 2000);
    }

    function updateProgress() {
        const progress = (currentTime / totalTime) * 100;
        progressFill.style.width = progress + '%';
        
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // ========== BREATHING EXERCISE ==========
    const breathingBtn = document.getElementById('breathingBtn');
    
    if (breathingBtn) {
        breathingBtn.addEventListener('click', function() {
            // Redirect to meditation page with breathing exercise
            window.location.href = '/meditation';
        });
    }

    // ========== I'M OKAY BUTTON ==========
    const okBtn = document.querySelector('.ok-btn');
    
    if (okBtn) {
        okBtn.addEventListener('click', function() {
            this.textContent = '💙 Good to hear';
            this.style.background = '#66bb6a';
            
            setTimeout(() => {
                this.textContent = "I'M OKAY";
                this.style.background = '';
            }, 2000);
        });
    }

    // ========== CARD ANIMATIONS ==========
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });

    // ========== LOAD RECOMMENDATIONS ==========
    async function loadRecommendations() {
        try {
            const response = await fetch('/api/recommendations');
            const recommendations = await response.json();
            console.log('AI Recommendations loaded:', recommendations);
        } catch (error) {
            console.error('Error loading recommendations:', error);
        }
    }

    // Initialize
    loadRecommendations();
});
