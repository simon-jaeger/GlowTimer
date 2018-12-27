// utils
////////////////////////////////////////////////////////////////////////////////
const milisecsToMMSS = milisecs => {
  const secs = Math.round(milisecs / 1000);
  const mm = Math.floor(secs / 60);
  const ss = secs % 60;
  return `${mm >= 10 ? mm : "0" + mm}:${ss >= 10 ? ss : "0" + ss}`;
};

const $ = document.querySelector.bind(document);

// main
////////////////////////////////////////////////////////////////////////////////
let tick;
let duration = 0.1 * 60 * 1000;
let start = Date.now();
let end = start + duration;
let timeLeft = duration;

const $mins = $(".mins");
const $secs = $(".secs");
const $ring = $(".progressRing_fill");

function render() {
  const mmss = milisecsToMMSS(timeLeft);
  document.title = mmss + " – Pomodoro";
  $mins.textContent = mmss.slice(0, 2);
  $secs.textContent = mmss.slice(3, 5);
  $ring.style.strokeDashoffset =
    (1 - timeLeft / duration) * $ring.getAttribute("stroke-dasharray");
}

function playTimer() {
  clearInterval(tick);
  if (timeLeft < duration) {
    console.log("timer resumed");
    start = Date.now() - (duration - timeLeft);
  } else {
    console.log("timer started");
    start = Date.now();
  }
  end = start + duration;
  tick = setInterval(() => {
    timeLeft = Math.round((end - Date.now()) / 1000) * 1000;
    console.log(timeLeft);
    render();
    if (timeLeft <= 0) {
      clearInterval(tick);
      timeLeft = duration;
      console.log("timer finished");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(tick);
  console.log("timer paused");
}

function resetTimer() {
  clearInterval(tick);
  timeLeft = duration;
  console.log("timer reset");
  render();
}

// init
////////////////////////////////////////////////////////////////////////////////
render();
