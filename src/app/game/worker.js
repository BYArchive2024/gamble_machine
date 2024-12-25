let currentTime = 0;
let interval;

self.onmessage = (e) => {
  if (e.data.type === "startTimer") {
    if (interval) {
      clearInterval(interval);
    }
    currentTime = e.data.value;
    interval = setInterval(() => {
      if (currentTime > 0) {
        currentTime -= 1000;
        self.postMessage({
          type: "updateTime",
          value: currentTime,
        });
      } else if (currentTime === 0) {
        self.postMessage({ type: "timeout" });
        clearInterval(interval);
      }
    }, 1000);
  } else if (e.data.type === "stopTimer") {
    clearInterval(interval);
  }
};
