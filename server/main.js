const WebsocketServer = require("ws");
const wss = new WebsocketServer.Server({ port: 8080 });
wss.on("connection", (ws) => {
  console.log("Client connected");
  let count = 0;
  let newtime = (new Date()).getTime();
  ws.send("Hello from server");
  const interval = setInterval(() => {
    time = newtime;
    newtime = (new Date()).getTime();
    ws.send("Server: Interval " + Math.round((newtime - time)/1000) + " Count " + ++count);
  }, 3000);
  ws.on("message", (message) => {
    console.log(`Message received: ${message}`);
  });
  ws.onclose = () => {
    console.log("Client disconnected");
  };
  ws.onerror = (error) => {
    console.log(`WebSocket error: ${error}`);
  };
});
console.log("Server started on port 8080");
