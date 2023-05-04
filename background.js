let intervalId;
chrome.runtime.onInstalled.addListener(function () {
  chrome.action.setBadgeText({ text: "OFF" });
  console.log("setBadgeText is off from onInstalled");
});

// Start the timer
let isAlarmRunning = false;

function startAlarm() {
  console.log("in startAlarm");
  checkAlarms();
  if (isAlarmRunning) {
    console.log("Alarm is already running. Skipping...");
    return;
  }
  
  isAlarmRunning = true;
  
  // Clear any existing alarms
  chrome.alarms.clearAll();
  
  // Create a new alarm
  chrome.alarms.create("breakReminder", {
    delayInMinutes: 1,
  });
  console.log("Alarm created");
  
  // Get info on the alarm
  let intervalId = setInterval(function () {
    chrome.alarms.get("breakReminder", function (alarm) {
      if (intervalId) {
        chrome.action.setBadgeText({ text: "ON" });
        console.log("setBadgeText to on");
        const timeRemaining = alarm.scheduledTime - Date.now();
        const minutes = Math.floor(timeRemaining / 60000);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        const timeLeft = `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
        console.log(`Time remaining on alarm: ${timeLeft}`);
      }
    });
  }, 1000);
 
  
  // When 20 minutes has passed
  chrome.alarms.onAlarm.addListener(function (alarm) {
    if (intervalId) {
      console.log(intervalId)
      console.log("20min break! triggered");
      chrome.action.setBadgeText({ text: "OFF" });
      console.log('setBadgeText to Off');
      //checkAlarms();
      
      clearInterval(intervalId);
      console.log("Alarm stopped!");
      
      displayNotif();
      
      // Set a timeout of 20 seconds before starting a new alarm
      setTimeout(function () {
        console.log("Setting up next alarm...");
        isAlarmRunning = false;
        startAlarm();
      }, 20000);
    }
  });
}


// Pause the timer
function pauseAlarm() {
  console.log("in pauseAlarm()");
  chrome.alarms.clear("breakReminder", function (wasCleared) {
    if (wasCleared) {
      clearInterval(alarmIntervalId);
      chrome.action.setBadgeText({ text: "OFF" });
      console.log("Alarm paused! and setBadgeText off");

      // Save the remaining time
      chrome.storage.local.set({ remainingTime: remainingTime }, function () {
        console.log("Remaining time saved:", remainingTime);
      });
    }
  });
}

// Stop the timer
function stopAlarm() {
  console.log("in stopAlarm()");
  if (intervalId) {
    chrome.alarms.clearAll();
    chrome.action.setBadgeText({ text: "OFF" });
    console.log("setBadgeText to off");
    clearInterval(intervalId);
    console.log("Alarm Stopped!");
  }
  if (!intervalId) {
    console.log("No actively running alarms to cancel!");
  }
  checkAlarms();
}

// Display the Notification
function displayNotif() {
  console.log("in displayNotif()");
  //chrome.action.setBadgeText({ text: "ON" });
  const options = {
    type: "progress",
    title: "Time for a break!",
    message:
      "Take a 20-second break and look at an item 20 feet (6 meters) away from your screen.",
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
        chrome.action.setBadgeText({ text: "OFF" });
        console.log("setBadgeText to off");
        clearInterval(intervalId);
        chrome.notifications.clear(notificationId);
      }
    }, 1000);
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  if (request.action) {
    // console.log("here");
    switch (request.action) {
      case "testNotif":
        console.log('in testNotif "switch case" ');
        //chrome.action.setBadgeText({ text: "ON" });
        displayNotif();
        break;
      case "startTimer":
        console.log('in startTimer "switch case" ');
        chrome.action.setBadgeText({ text: "ON" });
        console.log("setBadgeText to ON");
        startAlarm();
        break;
      case "pauseTimer":
        console.log('in pauseTimer "switch case" ');
        pauseAlarm();
        break;
      case "stopTimer":
        console.log('in stopTimer "switch case" ');
        stopAlarm();
        break;
      case "resumeTimer":
        console.log('in resumeTimer "switch case" ');
        resumeAlarm();
        break;
      default:
        console.log("Unknown action");
    }
  }
  // sendResponse(() => {
  //   return true;
  // });
});

function checkAlarms(){
  chrome.alarms.getAll(function (alarms) {
    console.log("All currently scheduled alarms:");
    alarms.forEach(function (alarm) {
      console.log("Name:", alarm.name);
      console.log("Scheduled time:", new Date(alarm.scheduledTime));
      console.log("Period:", alarm.periodInMinutes, "minutes");
    });
  });
}