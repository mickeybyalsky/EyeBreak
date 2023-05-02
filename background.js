let timer = {
  running: false,
  paused: false,
  timeRemaining: 0,
  intervalId: null,
};

// Start the timer
function startTimer() {
  console.log("in createalarm");
  chrome.alarms.create("breakReminder", {
    periodInMinutes: 20,
  });
  chrome.action.setBadgeText({ text: 'ON' });

  chrome.alarms.onAlarm.addListener(function(alarm) {
    if(alarm.name === "breakReminder") {
      console.log("20min break! triggered");
      displayNotif();

    }  
  })};

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

// Display the Notification
function displayNotif() {
  console.log("displayNotif");
  chrome.action.setBadgeText({ text: 'ON' });
  const options = {
    type: "progress",
    title: "Time for a break!",
    message: "Take a 20-second break and look away from your screen.",
    iconUrl: "images/eyeSmall.png",
    priority: 2,
    progress: 0,
  };
 
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
        chrome.action.setBadgeText({ text: 'OFF' });
        console.log("in displayNotif \"setBadgeText to Off conditon\" ");
      }
    }, 1000);
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  if (request.action) {
    console.log("here");
    if (request.action === "testNotif") 
    {
      console.log("in testNotif \"if conditon\" ");
      chrome.action.setBadgeText({ text: 'ON' });
      displayNotif();
    
    }
    else if (request.action === "startTimer"){
      console.log("in startTimer \"if conditon\" ");
      startTimer()
    }
    else if (request.action === "pauseTimer"){
      console.log("in pauseTimer \"if conditon\" ");
      pauseTimer();
    }
    else if (request.action === "stopTimer"){
      console.log("in stopTimer \"if conditon\" ");
      stopTimer();
    }
  
  }
  sendResponse(() => {
    return true;
  });
});