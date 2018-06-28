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

const start = document.getElementById('start');
start.addEventListener('click', startTimer, {once: true});

function startWorkout() {
  // reset timer
  hour = 0, minute = 0; second = 0;
  timer.innerHTML = `${hour} hr ${minute} mins ${second} secs`;
  clearInterval(interval);
  document.body.addEventListener('keydown', startTimer, {once: true}); // invoke the listener only once
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

  // display a new quote everytime user hit 15 count
  if (counter === 1 || counter % 15 === 0) {
    displayQuotes();
  }

  // display a congratulations modal when user finished 100 count
  if (counter === 100) {
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

  document.getElementById('chart').style.display = "none";

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
    durHour: hour,
    durMin: minute,
    durSec: second,
    c: counter,
  };
  savedTime.push(timeObj);
  localStorage.setItem("savedTime", JSON.stringify(savedTime));
}

function retrieveTime() {
  savedTime.map( (e, index) => {
    const li = document.createElement('li')
    li.innerHTML = `${e.d}/${e.m}/${e.y} @ ${e.hr}:${e.min}:${e.sec} -->
      ${e.durHour}:${e.durMin}:${e.durSec}, count: ${e.c}`;
    li.style.display = "inline-block";
    const remove = document.createElement('button')
    remove.addEventListener('click', function() { removeTime(index); });
    remove.innerHTML = `remove`;
    remove.style.fontSize = "0.5em";
    remove.style.margin = "5px";
    li.appendChild(remove);
    history.insertBefore(li, history.childNodes[0]);
  });
  drawChart();
}

// TODO : make a button to clear all
// localStorage.clear();

function removeTime(index) {
  savedTime.splice(index, 1);
  localStorage.setItem("savedTime", JSON.stringify(savedTime)); // save again after update
  // NOTE: as of right now, you have to refresh the page..., need to work on this
}

/*
*/
// Add google charts to your web page. Load google charts:
google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart); // calling the fn inside retrieveTime fn

// Draw the chart and set the chart values
function drawChart() {

  /* Function to convert array of objects to array of arrays
   * Dont' really need this b/c we only need to convert specific values
  // console.log(savedTime);
  const output = savedTime.map(function(obj) {
    return Object.keys(obj).sort().map(function(key) {
      return obj[key];
    });
  });
  console.log(output);
  */

  const outputData = [];
  outputData.push(['durMin', 'count']); // must give a header to the table "array"
  for(let i = 0; i < savedTime.length; i++) {
    const input = savedTime[i];
    outputData.push([+input.durMin, +input.c]); // must push #, cannot push string
  }

  // const data = google.visualization.arrayToDataTable([ ['Age', 'Weight'], [ 8, 12], [ 6.5, 7] ]);
  const data = google.visualization.arrayToDataTable(outputData);

  // Optional; add a title and set the width and height of the chart
  const options = {
    title: 'Duration vs. Count comparison',
    hAxis: {title: 'Duration (minutes)', minValue: 0, maxValue: 60},
    vAxis: {title: 'Count', minValue: 0, maxValue: 60},
    legend: 'none'
  };

  // Display the chart inside the <div> element with id="chart"
  const chart = new google.visualization.ScatterChart(document.getElementById('chart'));

  chart.draw(data, options);
}
