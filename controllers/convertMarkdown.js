import { convertMarkdownService } from "../services/markDown.service.js";

export function markDownToHTML(server) {
  server.on("connection", (socket) => {
    console.log("Client connected.");

    socket.on("message", (message) => {
      console.log("Received Markdown:", message.toString());
      socket.send(convertMarkdownService(message.toString()));
    });

    socket.on("close", () => console.log("Client disconnected."));
  });
  console.log("WebSocket server is running...");
}
