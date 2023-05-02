chrome.action.setBadgeText({ text: 'OFF' });
//startTimer
const startTimer = document.getElementById("startTimer");
startTimer.addEventListener("click", function () {
  console.log("startTimer clicked!");
  chrome.runtime.sendMessage({ action: "startTimer" }, function (response) {
    console.log(response);
  });
});

//pauseTimer
const pauseTimer = document.getElementById("pauseTimer");
pauseTimer.addEventListener("click", function () {
  console.log("pauseTimer clicked!");
  chrome.runtime.sendMessage({ action: "pauseTimer" }, function (response) {
    console.log(response);
  });
});

//stopTimer
const stopTimer = document.getElementById("stopTimer");
stopTimer.addEventListener("click", function () {
  console.log("stopTimer clicked!");
  chrome.runtime.sendMessage({ action: "stopTimer" }, function (response) {
    console.log(response);
  });
});

//testNotif
const testNotif = document.getElementById("testNotif");
testNotif.addEventListener("click", () => {
  console.log("testNotif clicked!");
  chrome.runtime.sendMessage({ action: "testNotif" }, function (response) {
    console.log(response);
  });
});
