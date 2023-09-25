const body = document.querySelector(`body`);
let idleTime = 0;

setInterval(incrementTimer, 60000); // 60000 milliseconds = 1 minute

body.addEventListener(`mouseover`, function (e) {
  resetIdleTime();
});

body.addEventListener(`keypress`, function (e) {
  resetIdleTime();
});

function incrementTimer() {
  idleTime++;

  if (idleTime > 19) {
    sendIdleRequest();
    resetIdleTime();
  }
}

function sendIdleRequest() {
  fetch("/api/users/idle", {
    method: `POST`,
  })
    .then((response) => {
      if (!response.ok) {
        console.error("Failed to send idle request.");
      }
    })
    .catch((error) => {
      console.error("Error sending idle request:", error);
    });
}

function resetIdleTime() {
  idleTime = 0;
}
