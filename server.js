const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

class VirtualHealthAssistant {
    constructor(user_name, age) {
        this.user_name = user_name;
        this.age = age;
        this.health_status = {};
    }

    setHealthStatus(parameter, value) {
        this.health_status[parameter] = value;
    }

    getPersonalizedGuidance() {
        let guidance = `Hello ${this.user_name}, here are your personalized health recommendations:`;
        for (let [parameter, value] of Object.entries(this.health_status)) {
            guidance += `\n${parameter}: ${value}`;
        }
        return guidance;
    }

    remindMedication(medicationName, timing) {
        return `Reminder: Take ${medicationName} at ${timing}.`;
    }
}

const sunita = new VirtualHealthAssistant("Sunita Sharma", 65);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/update_health', (req, res) => {
    const parameter = req.body.parameter;
    const value = req.body.value;
    sunita.setHealthStatus(parameter, value);
    res.redirect('/');
});

app.get('/remind_medication', (req, res) => {
    const medicationName = req.query.medication_name;
    const timing = req.query.timing;
    const reminder = sunita.remindMedication(medicationName, timing);
    res.redirect(`/?reminder=${encodeURIComponent(reminder)}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
