document.addEventListener('DOMContentLoaded', () => {
    const usernameSpan = document.getElementById('username');
    const guidanceParagraph = document.getElementById('guidance');
    const reminderParagraph = document.getElementById('reminder');
    const updateHealthForm = document.getElementById('updateHealthForm');
    const remindMedicationForm = document.getElementById('remindMedicationForm');

    usernameSpan.innerText = "Sunita Sharma";

    // Display guidance and reminder if available
    const urlParams = new URLSearchParams(window.location.search);
    guidanceParagraph.innerText = urlParams.get('reminder') ? '' : urlParams.get('guidance');
    reminderParagraph.innerText = urlParams.get('reminder') || '';

    // Update Health Form Submission
    updateHealthForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const parameter = document.getElementById('parameter').value;
        const value = document.getElementById('value').value;
        updateHealth(parameter, value);
    });

    // Remind Medication Form Submission
    remindMedicationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const medicationName = document.getElementById('medicationName').value;
        const timing = document.getElementById('timing').value;
        remindMedication(medicationName, timing);
    });

    function updateHealth(parameter, value) {
        fetch('/update_health', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `parameter=${parameter}&value=${value}`,
        })
        .then(response => window.location.reload())
        .catch(error => console.error('Error:', error));
    }

    function remindMedication(medicationName, timing) {
        fetch(`/remind_medication?medication_name=${medicationName}&timing=${timing}`)
        .then(response => window.location.reload())
        .catch(error => console.error('Error:', error));
    }
});
