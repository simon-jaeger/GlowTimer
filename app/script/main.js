// TODO: design clean algorithm

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
const state = {
  timer: null,
  pomodoro: 1 * 60 * 1000,
  // break: 5,
  // phase: "pomodoro",
  phaseEnd: 0,
};

const $mins = $(".mins");
const $secs = $(".secs");
const $ring = $(".progressRing_fill");

function startTimer() {
  state.phaseEnd = Date.now() + state.pomodoro;
  state.timer = setInterval(() => {
    const milisecsLeft = state.phaseEnd - Date.now();
    const mmss = milisecsToMMSS(milisecsLeft);
    document.title = mmss + " – Pomodoro";
    $mins.textContent = mmss.slice(0, 2);
    $secs.textContent = mmss.slice(3, 5);
    $ring.style.strokeDashoffset =
      (1 - state.pomodoro / milisecsLeft) *
      $ring.getAttribute("stroke-dasharray");
    if (milisecsLeft <= 0) {
      clearInterval(timer);
      window.alert("pomodoro over");
    }
  }, 1000);
}


