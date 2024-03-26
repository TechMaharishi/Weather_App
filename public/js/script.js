const loader = document.querySelector('.loader_container');
const pageContent = document.querySelector('.page_container');

// Loading animation before the page completely loads 
window.addEventListener('load', () => {
    loader.classList.add('hidden');
    pageContent.classList.add('visible');
});

// Function to display current time and date
function displayCurrentTimeAndDate() {
    // Create a new Date object
    var now = new Date();

    // Get the current time components
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Convert to 12-hour format and add AM/PM
    var ampm = hours >= 12 ? 'PM' : 'AM';
    var hour = hours % 12;
    hour = hour ? hour : 12;   // Handle midnight (0 hours)

    // Format the time as hh:mm:ss AM/PM
    var formattedTime = padZero(hour) + ":" + padZero(minutes) + ":" + padZero(seconds) + " " + ampm;

    // Get the current date components
    var year = now.getFullYear();
    var month = now.getMonth() + 1; // Months are 0-indexed
    var day = now.getDate();

    // Format the date as yyyy-mm-dd
    var formattedDate = year + "-" + padZero(month) + "-" + padZero(day);

    // Display the time and date in the 'currentTime' and 'date' divs
    document.getElementById("currentTime").textContent = "Last Updated: " + formattedTime;
    document.getElementById("date").textContent = formattedDate;
}

// Function to pad single-digit numbers with a leading zero
function padZero(number) {
    return number < 10 ? "0" + number : number;
}

// Call the displayCurrentTimeAndDate function every second (1000 milliseconds)
setInterval(displayCurrentTimeAndDate, 1000);

// Initial call to display the time and date immediately
displayCurrentTimeAndDate();
