window.onload = function() { startWorkout() };

// create component to display duration, has a start and stop one reps = 1000
// pick 10 hot pictures and display each time rep = 100

let counter = 0;
let keys;
let hour = 0, minute = 0, second = 0;
let interval;

const reps = document.createElement('h2');
const timer = document.createElement('div');

function startWorkout() {
  const spacebar = document.getElementById('spacebar');

  // reset timer
  hour = 0, minute = 0; second = 0;
  timer.innerHTML = `${hour} hour ${minute} minutes ${second} seconds`;
  clearInterval(interval);
  document.body.addEventListener('keydown', startTimer, {once:true}); // invoke the listener only once
  timer.style.color = "blue";
  timer.style.padding = "10px";
  spacebar.appendChild(timer);

  // reset counter
  counter = 0;
  spacebar.appendChild(reps);
  reps.style.fontSize = "800%";
  reps.innerHTML = counter;

  const stop = document.getElementById('stop');
  stop.addEventListener('click', displayCongrats);

  update();
}

function update() {
  document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
      updateCounter();
    }
  }
}

function updateCounter() {
  counter++;
  reps.innerHTML = counter;

  // display a new quote everytime user hit 50 count
  if (counter === 1 || counter % 5 === 0) {
    displayQuotes();
  }

  // display a congratulations modal when user finished 1000 count
  if (counter === 10) {
    displayCongrats();
  }
}

function displayQuotes() {
  const q0 = "COME ON, YOU CAN DO IT!!!";
  const q1 = "GOOD THINGS COME TO THOSE WHO SWEAT";
  const q2 = "HUSTLE FOR THAT MUSCLE";
  const q4 = "PUSH HARDER THAN YESTERDAY IF YOU WANT A DIFFERENT TOMORROW";
  const q3 = "IF YOU START NOW YOU'LL START SEEING RESULTS ONE DAY EARLIER!!!";
  const q5 = "RESULTS HAPPEN OVERTIME, NOT OVERNIGHT. BE PATIENT";
  const q6 = "IT COMES DOWN TO ONE SIMPLE THING: HOW BAD DO YOU WANT IT?";
  const q7 = "WORKOUT IS HARD, BEING FAT IS HARD, PICK YOUR HARD";
  const q8 = "IF IT DOESN'T CHALENGE YOU, IT DOESN'T CHANGE YOU";
  const q9 = "NOT EVERY IS A GOOD DAY. SHOW UP ANYWAY!";

  const quotes = [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9];

  const random = function(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const motivation = document.getElementById('motivation');
  motivation.style.color = "red";
  motivation.innerHTML = quotes[random(0, 9)];
}

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = `${hour} hour ${minute} minutes ${second} seconds`;
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

function displayCongrats() {
  clearInterval(interval);
  const congrats = document.getElementById('congrats');
  congrats.style.display = "flex";

  const totalTime = document.createElement('h3');
  totalTime.innerHTML = `Finished in: ${timer.innerHTML}`;
  totalTime.style.color = "black";
  totalTime.style.fontSize = "3em";
  congrats.appendChild(totalTime);

}

// picture modal
// LATER: save time to localstorage
