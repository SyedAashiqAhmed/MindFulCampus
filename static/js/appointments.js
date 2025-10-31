// MindfulCampus - Appointments Page JavaScript
// Counseling appointment scheduling

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentFeedback = document.getElementById('appointmentFeedback');
    const appointmentsList = document.getElementById('appointmentsList');
    const appointmentDate = document.getElementById('appointmentDate');

    // Set minimum date to today
    if (appointmentDate) {
        const today = new Date().toISOString().split('T')[0];
        appointmentDate.min = today;
        appointmentDate.value = today;
    }

    // Load existing appointments
    loadAppointments();

    // Submit Appointment Form
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const preferredTypeRadio = document.querySelector('input[name="preferredType"]:checked');
            const formData = {
                name: document.getElementById('studentName').value,
                email: document.getElementById('studentEmail').value,
                phone: document.getElementById('studentPhone').value,
                sessionType: document.getElementById('sessionType').value,
                preferredType: preferredTypeRadio ? preferredTypeRadio.value : 'video',
                date: document.getElementById('appointmentDate').value,
                time: document.getElementById('appointmentTime').value,
                reason: document.getElementById('appointmentReason').value,
                reminderEmail: document.getElementById('reminderEmail').checked
            };

            // Validate
            if (!formData.name || !formData.email || !formData.sessionType || !formData.date || !formData.time) {
                showFeedback('Please fill in all required fields.', 'error');
                return;
            }

            // Save appointment via API
            saveAppointment(formData);
        });
    }

    // Save Appointment
    async function saveAppointment(appointment) {
        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointment)
            });

            const data = await response.json();
            
            if (data.success) {
                showFeedback('Appointment booked successfully! 🌟 Doctor will schedule your meeting soon.', 'success');
                appointmentForm.reset();
                appointmentDate.value = new Date().toISOString().split('T')[0];
                setTimeout(() => loadAppointments(), 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            showFeedback('Could not book appointment. Please try again.', 'error');
        }
    }

    // Load Appointments
    async function loadAppointments() {
        try {
            const response = await fetch('/api/appointments');
            const appointments = await response.json();
            
            // Filter future appointments for current user (simplified - in production use auth)
            const now = new Date();
            const upcomingAppointments = appointments.filter(apt => {
                if (!apt.appointmentDate || !apt.appointmentTime) return false;
                const aptDate = new Date(apt.appointmentDate + 'T' + apt.appointmentTime);
                return aptDate > now && apt.status !== 'cancelled';
            });

            // Sort by date
            upcomingAppointments.sort((a, b) => {
                const dateA = new Date(a.appointmentDate + 'T' + a.appointmentTime);
                const dateB = new Date(b.appointmentDate + 'T' + b.appointmentTime);
                return dateA - dateB;
            });

        // Render appointments
        if (upcomingAppointments.length === 0) {
            appointmentsList.innerHTML = `
                <div class="glass-card empty-state">
                    <div class="empty-icon">📅</div>
                    <p class="empty-text">No appointments scheduled yet.</p>
                    <p class="empty-subtext">Book your first session above to get started.</p>
                </div>
            `;
        } else {
            appointmentsList.innerHTML = '';
            upcomingAppointments.forEach((apt, index) => {
                const card = createAppointmentCard(apt);
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('animate-fadeInUp');
                appointmentsList.appendChild(card);
            });
        }
        } catch (error) {
            console.error('Error loading appointments:', error);
            appointmentsList.innerHTML = `
                <div class="glass-strong rounded-2xl p-8 text-center">
                    <div class="text-5xl mb-4">📭</div>
                    <p class="text-gray-300">Could not load appointments</p>
                </div>
            `;
        }
    }

    // Create Appointment Card
    function createAppointmentCard(appointment) {
        const card = document.createElement('div');
        card.className = 'glass-strong rounded-2xl p-6 hover-lift';

        // Format date and time
        const dateField = appointment.scheduledDate || appointment.appointmentDate;
        const timeField = appointment.scheduledTime || appointment.appointmentTime;
        
        const date = new Date(dateField);
        const formattedDate = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const time = formatTime(timeField);
        const sessionTypeLabels = {
            'individual': 'Individual Counseling',
            'group': 'Group Therapy',
            'crisis': 'Crisis Intervention',
            'academic': 'Academic Stress Support',
            'relationship': 'Relationship Counseling'
        };

        const typeIcons = {
            'video': '📹',
            'chat': '💬',
            'in-person': '🏥'
        };

        const statusBadge = appointment.status === 'scheduled' 
            ? '<span class="px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500 text-xs font-semibold">Scheduled</span>'
            : '<span class="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500 text-xs font-semibold">Pending</span>';

        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div>
                    <div class="text-2xl font-bold mb-2">${formattedDate}</div>
                    <div class="text-lg text-accent mb-2">🕐 ${time}</div>
                    <div class="text-sm text-gray-300">${sessionTypeLabels[appointment.sessionType] || appointment.sessionType}</div>
                    ${appointment.preferredType ? `<div class="text-sm text-gray-400 mt-1">${typeIcons[appointment.preferredType] || '📋'} ${appointment.preferredType}</div>` : ''}
                </div>
                ${statusBadge}
            </div>
            
            ${appointment.meetingLink ? `
            <div class="glass rounded-xl p-3 mb-4">
                <p class="text-xs text-gray-400 mb-1">Meeting Link:</p>
                <a href="${appointment.meetingLink}" target="_blank" class="text-sm text-accent hover:underline break-all">
                    ${appointment.meetingLink}
                </a>
            </div>
            ` : ''}
            
            ${appointment.doctorNotes ? `
            <div class="glass rounded-xl p-3 mb-4">
                <p class="text-xs text-gray-400 mb-1">Doctor's Notes:</p>
                <p class="text-sm">${appointment.doctorNotes}</p>
            </div>
            ` : ''}
            
            <div class="flex gap-2 mt-4">
                <button class="cancel-btn flex-1 px-4 py-2 glass-strong hover:bg-red-500/20 rounded-xl font-semibold transition-all text-sm" data-id="${appointment.id}">
                    Cancel Appointment
                </button>
            </div>
        `;

        // Add cancel functionality
        const cancelBtn = card.querySelector('.cancel-btn');
        cancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel this appointment?')) {
                cancelAppointment(appointment.id);
            }
        });

        return card;
    }

    // Cancel Appointment
    async function cancelAppointment(id) {
        try {
            const response = await fetch(`/api/doctor/appointments/${id}/cancel`, {
                method: 'POST'
            });

            if (response.ok) {
                showFeedback('Appointment cancelled. Remember, it\'s always okay to reschedule.', 'success');
                loadAppointments();
            }
        } catch (error) {
            console.error('Error:', error);
            showFeedback('Could not cancel appointment. Please try again.', 'error');
        }
    }

    // Format Time
    function formatTime(time24) {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }

    // Show Feedback
    function showFeedback(message, type) {
        if (!appointmentFeedback) return;
        
        appointmentFeedback.textContent = message;
        appointmentFeedback.classList.remove('hidden');
        
        if (type === 'success') {
            appointmentFeedback.className = 'mt-4 p-4 rounded-2xl text-center font-medium bg-green-500/20 text-green-300 border-2 border-green-500';
        } else {
            appointmentFeedback.className = 'mt-4 p-4 rounded-2xl text-center font-medium bg-red-500/20 text-red-300 border-2 border-red-500';
        }

        setTimeout(() => {
            appointmentFeedback.classList.add('hidden');
        }, 5000);
    }
});
