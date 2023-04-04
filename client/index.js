const ws = new WebSocket("ws://localhost:8080");
let count = 0;
let newtime = new Date().getTime();
const getState = () => {
  if (document.visibilityState === "hidden") {
    return "hidden";
  }
  if (document.hasFocus()) {
    return "active";
  }
  return "passive";
};
document.onfreeze = (e) => {
  console.log("Event: Freeze");
};
document.addEventListener("resume", (event) => {
  console.log("Event: Resume");
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    console.log("Event: visibilityChange - visible");
  } else {
    console.log("Event: visibilityChange - hidden");
  }
});
window.addEventListener("focus", (event) => {
  console.log("Event: focus", event);
});

window.addEventListener("blur", (event) => {
  console.log("Event: blur", event);
});
ws.onopen = () => {
  console.log("Connected to server");
  ws.send("Hello from client");
};
ws.onmessage = (event) => {
  time = newtime;
  newtime = new Date().getTime();
  console.log(`${event.data}`);
  console.log(
    "Client: Interval",
    Math.round((newtime - time) / 1000),
    "Count",
    count++,
    "State",
    getState()
  );
};
ws.onclose = () => {
  console.log("Disconnected from server");
};
ws.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};
