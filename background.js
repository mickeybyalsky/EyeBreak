// Set the default state of the timer

let timer = {
  running: false,
  paused: false,
  timeRemaining: 0,
  intervalId: null,
};

// Start the timer
function startTimer() {
  chrome.alarms.create("breakReminder", {
    periodInMinutes: 20,
  });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "breakReminder") {
      displayNotif();
    }
  });
}

    //     timer.running = true;
    //     timer.paused = false;
    //     timer.timeRemaining = 60;
    //     timer.intervalId = setInterval(function() {
    //       timer.timeRemaining--;
    //       if (timer.timeRemaining <= 0) {
    //         // Time's up, show a notification
    //         chrome.notifications.create({
    //           type: 'basic',
    //           iconUrl: 'icon.png',
    //           title: 'Eye break!',
    //           message: 'It\'s time to take a break and rest your eyes.',
    //           requireInteraction: true
    //         });
    //         clearInterval(timer.intervalId);
    //         timer.running = false;
    //         timer.paused = false;
    //         timer.timeRemaining = 0;
    //       } else {
    //         // Update the timer display in the popup
    //         chrome.runtime.sendMessage({
    //           action: 'updateTimerDisplay',
    //           timeRemaining: timer.timeRemaining
    //         });
    //       }
    //     }, 1000);
    //   }

    // Pause the timer
  function pauseTimer() {
    if (timer.running && !timer.paused) {
      clearInterval(timer.intervalId);
      timer.paused = true;
    } else if (timer.running && timer.paused) {
      timer.intervalId = setInterval(function () {
        timer.timeRemaining--;
        if (timer.timeRemaining <= 0) {
          // Time's up, show a notification
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "Eye break!",
            message: "It's time to take a break and rest your eyes.",
            requireInteraction: true,
          });
          clearInterval(timer.intervalId);
          timer.running = false;
          timer.paused = false;
          timer.timeRemaining = 0;
        } else {
          // Update the timer display in the popup
          chrome.runtime.sendMessage({
            action: "updateTimerDisplay",
            timeRemaining: timer.timeRemaining,
          });
        }
      }, 1000);
      timer.paused = false;
    }
  }

  // Stop the timer
  function stopTimer() {
    if (timer.running) {
      clearInterval(timer.intervalId);
      timer.running = false;
      timer.paused = false;
      timer.timeRemaining = 0;
      chrome.runtime.sendMessage({
        action: "updateTimerDisplay",
        timeRemaining: 0,
      });
    }
  }

  function displayNotif() {
    console.log("displayNotif");

    const options = {
      type: "progress",
      title: "Time for a break!",
      message: "Take a 20-second break and look away from your screen.",
      iconUrl: "images/eyeSmall.png",
      priority: 2,
      progress: 0,
    };
    audio = new Audio("audio_file.mp3").play();
    chrome.notifications.create(options, function (notificationId) {
      console.log("Notification created:", notificationId);
      let progress = 0;
      const intervalId = setInterval(() => {
        if (progress < 100) {
          progress += 5;
          chrome.notifications.update(notificationId, { progress });
        } else {
          clearInterval(intervalId);
          chrome.notifications.clear(notificationId);
        }
      }, 1000);
    });
  }
    // // Listen for messages from the popup
    // chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //   console.log("in background.js");

    //   if (message === 'startTimer') {
    //       console.log(request.action);
    //       startTimer();
    //   } else if (message.action === 'pauseTimer') {
    //       pauseTimer();
    //   } else if (message.action === 'stopTimer') {
    //       stopTimer();
    //   } else if (message.action === 'testNotif') {
    //       console.log("in request.action");
    //       displayNotif();
    //       console.log(message);
    //       console.log("after displayNotif");
    //       sendResponse({message: "response from background.js"})
    //   }
    // });
 