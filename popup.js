//startTimer
const startTimer = document.getElementById("start_stopTimer");
startTimer.addEventListener("click", function () {
  if (startTimer.innerHTML === "Stop Timer") {
    startTimer.innerHTML = "Start Timer";
    console.log("stopTimer clicked!");
    chrome.runtime.sendMessage({ action: "stopTimer" }, function (response) {
      console.log(response);
    });
  } else {
    startTimer.innerHTML = "Stop Timer";
    console.log("startTimer clicked!");
    chrome.runtime.sendMessage({ action: "startTimer" }, function (response) {
      console.log(response);
    });
  }

  // });
  // function Start(){
  //     console.log("Started");
  //     startTimer.removeEventListener("click", Start);
  //     startTimer.addEventListener("click", Stop);
  //     startTimer.innerHTML = "Stop Timer";
  //     console.log("startTimer clicked!");
  //     chrome.runtime.sendMessage({ action: "startTimer" }, function (response) {
  //         console.log(response);
  //     });
  // }

  // function Stop(){
  //     console.log("Stopped");
  //     startTimer.removeEventListener("click", Stop);
  //     startTimer.addEventListener("click", Start);
  //     startTimer.innerHTML = "Start Timer";
  //     console.log("stopTimer clicked!");
  //     chrome.runtime.sendMessage({ action: "stopTimer" }, function (response) {
  //         console.log(response);
  // }};
  // //stopTimer
  // const stopTimer = document.getElementById("stopTimer");
  // stopTimer.addEventListener("click", function () {
  //   console.log("stopTimer clicked!");
  //   chrome.runtime.sendMessage({ action: "stopTimer" }, function (response) {
  //     console.log(response);
  //   });
  // });

  //resumeTimer
  const resumeTimer = document.getElementById("resumeTimer");
  resumeTimer.addEventListener("click", function () {
    console.log("resumeTimer clicked!");
    chrome.runtime.sendMessage({ action: "resumeTimer" }, function (response) {
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

  //testNotif
  const testNotif = document.getElementById("testNotif");
  testNotif.addEventListener("click", () => {
    console.log("testNotif clicked!");
    chrome.runtime.sendMessage({ action: "testNotif" }, function (response) {
      console.log(response);
    });
  });
});
