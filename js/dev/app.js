(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
document.addEventListener("DOMContentLoaded", () => {
  let time = 30 * 60;
  const hoursEl = document.querySelector(".timer__hours");
  const minutesEl = document.querySelector(".timer__minytes");
  const secondsEl = document.querySelector(".timer__seconds");
  function updateTimer() {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time % 3600 / 60);
    let seconds = time % 60;
    hoursEl.innerHTML = `<div class="timer__item">${hours}</div><div class="timer__label">год.</div>`;
    minutesEl.innerHTML = `<div class="timer__item">${minutes}</div><div class="timer__label">хв.</div>`;
    secondsEl.innerHTML = `<div class="timer__item">${seconds}</div><div class="timer__label">сек.</div>`;
    if (time > 0) {
      time--;
    } else {
      clearInterval(timerInterval);
    }
  }
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1e3);
});
document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("start-date");
  const today = /* @__PURE__ */ new Date();
  today.setDate(today.getDate() + 1);
  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня"
  ];
  const day = today.getDate();
  const month = months[today.getMonth()];
  dateElement.textContent = `Старт ${day} ${month}`;
});
