window.onload = function() { startWorkout() };

// create component to display duration, has a start and stop one reps = 1000
// pick 10 hot pictures and display each time rep = 100

let counter = 0;
let keys;

const newh2 = document.createElement('h2');

function startWorkout() {
  counter = 0;
  document.body.appendChild(newh2);
  newh2.innerHTML = counter;

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
  newh2.innerHTML = counter;

  // display a new quote everytime user hit 50 count
  if (counter === 1 || counter % 5 === 0) {
    displayQuotes();
  }

  // display a congratulations modal when user finished 1000 count
  if (counter === 1000) {
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

  const motivation = document.getElementById('motivation');
  const random = function(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  motivation.style.color = "red";
  motivation.innerHTML = quotes[random(0, 9)];
}

function displayCongrats() {
  const congrats = document.getElementById('congrats');
  congrats.style.display = "flex";
}

// duration
// picture modal
// congrats modal
//
// LATER: save time to localstorage
