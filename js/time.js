function updateDateTime() {

// create a new `Date` object
const now = new Date();

const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

// get the current date and time as a string
const currentHour = hours.toLocaleString();
const currentMinutes = minutes.toLocaleString();
const currentseconds = seconds.toLocaleString();


//chceck if the number is from 1 to 9 and add 0 at the begining
//update the `textContent` property of the `span` element with the `id` of `datetime`

if (hours < 10) {
    document.querySelector('#hours').textContent = "0" + currentHour;
} else {
    document.querySelector('#hours').textContent = currentHour;
}
if (minutes < 10) {
    document.querySelector('#minutes').textContent = "0" + currentMinutes;
} else {
    document.querySelector('#minutes').textContent = currentMinutes;
}
if (seconds < 10) {
    document.querySelector('#seconds').textContent = "0" + currentseconds;
} else {
    document.querySelector('#seconds').textContent = currentseconds;
}

}
    
// call the `updateDateTime` function every second
updateDateTime();
setInterval(updateDateTime, 1000);