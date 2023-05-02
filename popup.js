//startTimer
const startTimer = document.getElementById("startTimer");
startTimer.addEventListener("click", function() {
    console.log("startTimer clicked!");
    chrome.runtime.sendMessage({action: 'startTimer'});
});

//pauseTimer
const pauseTimer = document.getElementById("pauseTimer");
pauseTimer.addEventListener("click", function() {
    console.log("pauseTimer clicked!");
    chrome.runtime.sendMessage({action: 'pauseTimer'});
});

//stopTimer
const stopTimer = document.getElementById("stopTimer");
stopTimer.addEventListener("click", function() {
    console.log("stopTimer clicked!");
    chrome.runtime.sendMessage({action: 'stopTimer'});
});


//testNotif
const testNotif = document.getElementById("testNotif");
// testNotif.addEventListener('click', () => {
//     chrome.runtime.sendMessage({action: 'testNotif'}, function(response){
//         console.log(response.message);
//     });
// });
testNotif.addEventListener("click", () => {
    console.log("testNotif clicked!");
    chrome.runtime.sendMessage({action: "testNotif"}, (response) => {
        console.log(response.message);
    })
    console.log("testNotif2 clicked!");
    // chrome.runtime.sendMessage({action: 'testNotif'}, function (response) {
    //     console.log(response.message);
    // });
});
// function() {
//     console.log("testNotif clicked!");
//     chrome.runtime.sendMessage({action: 'testNotif'}), function(response){
//         console.log(response.message);
//     }
    


// testNotif
// const testNotif = document.getElementById("testNotif");
// testNotif.addEventListener('click', function() {
//   console.log("testNotif clicked!");
//   const options = {
//     type: 'progress',
//     title: 'Time for a break!',
//     message: 'Take a 20-second break and look away from your screen.',
//     iconUrl: 'images/eyeSmall.png',
//     priority: 2,
//     progress: 0
//   };

//   chrome.notifications.create(options, function(notificationId) {
//     console.log('Notification created:', notificationId);
//     let progress = 0;
//     const intervalId = setInterval(() => {
//       if (progress < 100) {
//         progress += 5;
//         chrome.notifications.update(notificationId, { progress });
//       } else {
//         clearInterval(intervalId);
//         chrome.notifications.clear(notificationId);
//       }
//     }, 1000);
//   });
// });





// testNotif.addEventListener("click", function() {
//     console.log("testNotif clicked!");
//     chrome.runtime.sendMessage({action: 'testNotif'});
// });


// ele.addEventListener("click", () => {
//     chrome.runtime.sendMessage({ time: "1" }, function (response) {
//         console.log(response);
//     });
// });



