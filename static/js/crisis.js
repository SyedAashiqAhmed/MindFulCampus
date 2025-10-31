// MindfulCampus - Crisis Page JavaScript
// Emergency resources and immediate breathing exercises

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const startBreathingBtn = document.getElementById('startBreathingBtn');
    const emergencyBreathing = document.getElementById('emergencyBreathing');
    const closeBreathingBtn = document.getElementById('closeBreathing');
    const stopBreathingBtn = document.getElementById('stopBreathingBtn');
    const emergencyBreathCircle = document.getElementById('emergencyBreathCircle');
    const breathCount = document.getElementById('breathCount');
    const breathingPhase = document.getElementById('breathingPhase');
    const breathingInstruction = document.getElementById('breathingInstruction');
    const helplinesGrid = document.getElementById('helplinesGrid');

    // State
    let breathingActive = false;
    let breathingInterval = null;

    // Load Crisis Info
    async function loadCrisisInfo() {
        try {
            const response = await fetch('/api/crisis');
            const data = await response.json();

            // Render helplines
            renderHelplines(data.helplines);
        } catch (error) {
            console.error('Error loading crisis info:', error);
        }
    }

    // Render Helplines
    function renderHelplines(helplines) {
        helplinesGrid.innerHTML = '';

        helplines.forEach((helpline, index) => {
            const card = document.createElement('div');
            card.className = 'glass-card helpline-card hover-lift';
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-fadeInUp');

            card.innerHTML = `
                <h3 class="helpline-name">${helpline.name}</h3>
                <div class="helpline-number">${helpline.number}</div>
                <div class="helpline-available">${helpline.available}</div>
            `;

            helplinesGrid.appendChild(card);
        });
    }

    // Start Emergency Breathing
    if (startBreathingBtn) {
        startBreathingBtn.addEventListener('click', function() {
            emergencyBreathing.style.display = 'flex';
            emergencyBreathing.classList.add('animate-fadeIn');
            startEmergencyBreathing();
        });
    }

    // Close Emergency Breathing
    function closeEmergencyBreathing() {
        stopEmergencyBreathing();
        emergencyBreathing.style.display = 'none';
    }

    if (closeBreathingBtn) {
        closeBreathingBtn.addEventListener('click', closeEmergencyBreathing);
    }

    if (stopBreathingBtn) {
        stopBreathingBtn.addEventListener('click', closeEmergencyBreathing);
    }

    // Emergency Breathing Exercise (4-7-8 Technique)
    function startEmergencyBreathing() {
        breathingActive = true;
        
        const phases = [
            { 
                name: 'Prepare', 
                instruction: 'Get ready to breathe in through your nose...', 
                duration: 2000, 
                count: '', 
                scale: 1 
            },
            { 
                name: 'Breathe In', 
                instruction: 'Breathe in slowly through your nose...', 
                duration: 4000, 
                count: '4', 
                scale: 1.4 
            },
            { 
                name: 'Hold', 
                instruction: 'Hold your breath...', 
                duration: 7000, 
                count: '7', 
                scale: 1.4 
            },
            { 
                name: 'Breathe Out', 
                instruction: 'Exhale slowly through your mouth...', 
                duration: 8000, 
                count: '8', 
                scale: 0.8 
            },
            { 
                name: 'Pause', 
                instruction: 'Great! Preparing for the next cycle...', 
                duration: 2000, 
                count: '', 
                scale: 1 
            }
        ];

        let currentPhase = 0;
        let countdownInterval = null;

        function runPhase() {
            if (!breathingActive) {
                clearInterval(breathingInterval);
                clearInterval(countdownInterval);
                return;
            }

            const phase = phases[currentPhase];
            
            // Update UI
            breathingPhase.textContent = phase.name;
            breathingInstruction.textContent = phase.instruction;
            breathCount.textContent = phase.count;

            // Animate circle
            emergencyBreathCircle.style.transform = `scale(${phase.scale})`;
            emergencyBreathCircle.style.transition = `transform ${phase.duration}ms ease-in-out`;

            // Countdown for timed phases
            if (phase.count) {
                let timeLeft = parseInt(phase.count);
                breathCount.textContent = timeLeft;

                clearInterval(countdownInterval);
                countdownInterval = setInterval(() => {
                    timeLeft--;
                    if (timeLeft > 0) {
                        breathCount.textContent = timeLeft;
                    } else {
                        breathCount.textContent = '';
                        clearInterval(countdownInterval);
                    }
                }, phase.duration / parseInt(phase.count));
            }

            // Move to next phase
            currentPhase = (currentPhase + 1) % phases.length;
        }

        // Start immediately
        runPhase();

        // Continue cycling
        breathingInterval = setInterval(runPhase, phases.reduce((sum, p) => sum + p.duration, 0) / phases.length);
    }

    // Stop Emergency Breathing
    function stopEmergencyBreathing() {
        breathingActive = false;
        clearInterval(breathingInterval);
        emergencyBreathCircle.style.transform = 'scale(1)';
    }

    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && emergencyBreathing.style.display === 'flex') {
            closeEmergencyBreathing();
        }
    });

    // Initialize
    loadCrisisInfo();
});
