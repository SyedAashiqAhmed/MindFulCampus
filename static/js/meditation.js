// MindfulCampus - Meditation Page JavaScript
// Meditation sessions and breathing exercises

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const meditationLibrary = document.getElementById('meditationLibrary');
    const activeSession = document.getElementById('activeSession');
    const closeSessionBtn = document.getElementById('closeSession');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const sessionTitle = document.getElementById('sessionTitle');
    const sessionDescription = document.getElementById('sessionDescription');
    const timeDisplay = document.getElementById('timeDisplay');
    const sessionStatus = document.getElementById('sessionStatus');
    const breathingGuide = document.getElementById('breathingGuide');
    const breathCircle = document.getElementById('breathCircle');
    const breathText = document.getElementById('breathText');
    const progressCircle = document.getElementById('progressCircle');

    // State
    let isPlaying = false;
    let currentSession = null;
    let timeRemaining = 0;
    let timerInterval = null;
    let breathInterval = null;
    const circumference = 2 * Math.PI * 90; // radius is 90

    // Initialize progress circle
    if (progressCircle) {
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
    }

    // Load Meditations
    async function loadMeditations() {
        try {
            const response = await fetch('/api/meditations');
            const meditations = await response.json();

            const breathing = meditations.filter(m => m.type === 'Breathing Exercise');
            const guided = meditations.filter(m => m.type === 'Guided Meditation');

            renderExercises('breathingExercises', breathing);
            renderExercises('guidedMeditations', guided);
        } catch (error) {
            console.error('Error loading meditations:', error);
        }
    }

    // Render Exercises
    function renderExercises(containerId, exercises) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        exercises.forEach((exercise, index) => {
            const card = document.createElement('div');
            card.className = 'glass-card exercise-card hover-lift';
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-fadeInUp');

            card.innerHTML = `
                <div class="exercise-type">${exercise.type}</div>
                <h3 class="exercise-title">${exercise.title}</h3>
                <div class="exercise-duration">${exercise.duration}</div>
                <p class="exercise-description">${exercise.description}</p>
            `;

            card.addEventListener('click', () => startSession(exercise));
            container.appendChild(card);
        });
    }

    // Start Session
    function startSession(session) {
        currentSession = session;
        
        // Parse duration (e.g., "5 min" -> 300 seconds)
        const minutes = parseInt(session.duration);
        timeRemaining = minutes * 60;

        // Update UI
        sessionTitle.textContent = session.title;
        sessionDescription.textContent = session.description;
        updateTimeDisplay();
        sessionStatus.textContent = 'Ready to begin';

        // Show active session, hide library
        meditationLibrary.style.display = 'none';
        activeSession.style.display = 'block';
        activeSession.classList.add('animate-fadeIn');

        // Show breathing guide for breathing exercises
        if (session.type === 'Breathing Exercise') {
            breathingGuide.style.display = 'block';
        } else {
            breathingGuide.style.display = 'none';
        }

        isPlaying = false;
        playIcon.textContent = '▶';
    }

    // Play/Pause
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                pauseSession();
            } else {
                playSession();
            }
        });
    }

    // Play Session
    function playSession() {
        isPlaying = true;
        playIcon.textContent = '⏸';
        playBtn.classList.add('playing');
        sessionStatus.textContent = 'In progress...';

        // Start timer
        timerInterval = setInterval(() => {
            timeRemaining--;
            updateTimeDisplay();
            updateProgress();

            if (timeRemaining <= 0) {
                completeSession();
            }
        }, 1000);

        // Start breathing animation if breathing exercise
        if (currentSession.type === 'Breathing Exercise') {
            startBreathingAnimation();
        }
    }

    // Pause Session
    function pauseSession() {
        isPlaying = false;
        playIcon.textContent = '▶';
        playBtn.classList.remove('playing');
        sessionStatus.textContent = 'Paused';

        clearInterval(timerInterval);
        clearInterval(breathInterval);
    }

    // Complete Session
    function completeSession() {
        pauseSession();
        sessionStatus.textContent = 'Great work! Session complete 🌟';
        playIcon.textContent = '✓';
        
        setTimeout(() => {
            closeSession();
        }, 3000);
    }

    // Close Session
    if (closeSessionBtn) {
        closeSessionBtn.addEventListener('click', closeSession);
    }

    function closeSession() {
        pauseSession();
        activeSession.style.display = 'none';
        meditationLibrary.style.display = 'block';
        currentSession = null;
        timeRemaining = 0;
    }

    // Update Time Display
    function updateTimeDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update Progress Circle
    function updateProgress() {
        if (!currentSession) return;
        
        const totalSeconds = parseInt(currentSession.duration) * 60;
        const progress = (totalSeconds - timeRemaining) / totalSeconds;
        const offset = circumference - (progress * circumference);
        
        progressCircle.style.strokeDashoffset = offset;
    }

    // Breathing Animation
    function startBreathingAnimation() {
        const breathCycles = {
            '4-7-8 Breathing': [
                { phase: 'Breathe In', duration: 4000 },
                { phase: 'Hold', duration: 7000 },
                { phase: 'Breathe Out', duration: 8000 }
            ],
            'Box Breathing': [
                { phase: 'Breathe In', duration: 4000 },
                { phase: 'Hold', duration: 4000 },
                { phase: 'Breathe Out', duration: 4000 },
                { phase: 'Hold', duration: 4000 }
            ]
        };

        const cycle = breathCycles[currentSession.title] || breathCycles['4-7-8 Breathing'];
        let currentPhase = 0;

        function nextPhase() {
            const phase = cycle[currentPhase];
            breathText.textContent = phase.phase;

            // Animate circle
            if (phase.phase === 'Breathe In') {
                breathCircle.style.transform = 'scale(1.3)';
            } else if (phase.phase === 'Breathe Out') {
                breathCircle.style.transform = 'scale(1)';
            }

            breathCircle.style.transition = `transform ${phase.duration}ms ease-in-out`;

            currentPhase = (currentPhase + 1) % cycle.length;
        }

        nextPhase();
        breathInterval = setInterval(nextPhase, cycle.reduce((sum, p) => sum + p.duration, 0) / cycle.length);
    }

    // Initialize
    loadMeditations();
});
