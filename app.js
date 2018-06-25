window.onload = function() { startWorkout() };

let counter = 0;
let keys;
let hour = 0, minute = 0, second = 0;
let interval;
let totalTime = '';

const reps = document.getElementById('reps');
const timer = document.createElement('div');
const history = document.getElementById('history');
const spacebar = document.getElementById('spacebar');

function startWorkout() {
  // reset timer
  hour = 0, minute = 0; second = 0;
  timer.innerHTML = `${hour} hr ${minute} mins ${second} secs`;
  clearInterval(interval);
  document.body.addEventListener('keydown', startTimer, {once:true}); // invoke the listener only once
  timer.style.color = "blue";
  timer.style.padding = "10px";
  spacebar.appendChild(timer);

  // reset counter
  counter = 0;
  reps.style.fontSize = "200px";
  reps.style.color = "blue";
  reps.style.height = "100%";
  reps.innerHTML = counter;

  // get the record of previously saved time
  retrieveTime();

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
  if (counter === 1 || counter % 25 === 0) {
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

  const random = function(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const motivation = document.getElementById('motivation');
  motivation.style.color = "red";
  motivation.innerHTML = quotes[random(0, 9)];
}

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = `${hour} hr ${minute} mins ${second} secs`;
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

  totalTime = document.createElement('h3');
  totalTime.innerHTML = `Finished in: ${timer.innerHTML}`;
  totalTime.style.color = "black";
  totalTime.style.fontSize = "3em";
  congrats.appendChild(totalTime);

  if (typeof(Storage) !== "undefined") {
    SaveTime();
  } else {
    console.log('Browser does not support local storage!');
  }
}

// TODO: start should start a youtube workout songs channel

// TODO: make a button to clear history
// localStorage.clear();
const savedTime = JSON.parse(localStorage.getItem("savedTime")) || [];

function SaveTime() {
  const date = new Date();
  const timeObj = {
    d: date.getDate(),
    m: date.getMonth() + 1, // b/c months count from 0-11
    y: date.getFullYear(),
    sec: date.getSeconds(),
    min: date.getMinutes(),
    hr: date.getHours(),
    dur: timer.innerHTML,
    c: counter,
  };
  savedTime.push(timeObj);
  localStorage.setItem("savedTime", JSON.stringify(savedTime));
}

function retrieveTime() {
  console.log('retrieving time', savedTime);
  savedTime.map(e => {
    const li = document.createElement('li')
    li.innerHTML = `<li>${e.d}/${e.m}/${e.y} @ ${e.hr}:${e.min}:${e.sec} --> ${e.dur}, count: ${e.c}</li>`;
    history.insertBefore(li, history.childNodes[0]);
  });
}
