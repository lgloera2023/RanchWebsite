// Define simple helper object for the countdown
const moment = {
    input_ms: 0,
    output_days: 0,
    output_hours: 0,
    output_minutes: 0,
    update_output: function() {
        if (this.input_ms != 0) {
            let num_ms = this.input_ms;

            // Pull the days out
            this.output_days = Math.floor(num_ms / (24 * 60 * 60 * 1000)); 
            num_ms -= (this.output_days * (24 * 60 * 60 * 1000));

            // Pull the hours out
            this.output_hours = Math.floor(num_ms / (60 * 60 * 1000)); 
            num_ms -= (this.output_hours * (60 * 60 * 1000));
            
            // Pull the minutes
            this.output_minutes = Math.floor(num_ms / (60 * 1000));
        }
    }
}

const timeCheck = window.setInterval(() => {
    try {
        // Define the recurring updates to the countdown
        eclipseStart = new Date("April 8, 2024 18:19:00");  // 1 minute ahead to align correctly
        countdown = document.querySelector("#countdown-h");
        countdown_v = document.querySelector("#countdown-v");

        // Convert the local time to GMT
        let date = new Date();
        let timeNow = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);  // Add the offset in milliseconds
        moment.input_ms = eclipseStart - timeNow;
        moment.update_output();

        if (countdown.querySelector("days").innerText != moment.output_days) {
            countdown.querySelector("days").innerText = moment.output_days;
            countdown_v.querySelector("days").innerText = moment.output_days;
        } 
        if (countdown.querySelector("hours").innerText != moment.output_hours) {
            countdown.querySelector("hours").innerText = moment.output_hours;
            countdown_v.querySelector("hours").innerText = moment.output_hours;
        }
        if (countdown.querySelector("minutes").innerText != moment.output_minutes) {
            countdown.querySelector("minutes").innerText = moment.output_minutes;
            countdown_v.querySelector("minutes").innerText = moment.output_minutes;
        }
    } catch (error) {
        // Countdown not defined yet
    }
}, 1000);
