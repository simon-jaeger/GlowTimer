let timer;

const state = {
  pomodoro: 25,
  // break: 5,
  // phase: "pomodoro",
  phaseEnd: 0,
};

function startTimer() {
  state.phaseEnd = Date.now() + state.pomodoro * 60 * 1000;
  timer = setInterval(() => {
    const milisecsLeft = state.phaseEnd - Date.now();
    const mmss = milisecsToMMSS(milisecsLeft);
    document.title = mmss + " – Pomodoro";
    $(".mins").textContent = mmss.slice(0, 2);
    $(".secs").textContent = mmss.slice(3, 5);
    if (milisecsLeft <= 0) {
      clearInterval(timer);
      window.alert("pomodoro over");
    }
  }, 1000);
}

// utils
const milisecsToMMSS = milisecs => {
  const secs = Math.round(milisecs / 1000);
  const mm = Math.floor(secs / 60);
  const ss = secs % 60;
  return `${mm >= 10 ? mm : "0" + mm}:${ss >= 10 ? ss : "0" + ss}`;
};

const $ = document.querySelector.bind(document);
