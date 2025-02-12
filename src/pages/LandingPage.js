import React, { useState, useEffect } from "react";
import "../styles/landingPage.css";
import TextArea from "../components/TextArea";
import RenderArea from "../components/RenderArea";
const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [socket, setSocket] = useState(null);
  const [selectedOption, setSelectedOption] = useState("text");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => console.log("Connected to WebSocket server");
    ws.onmessage = (event) => {
      //   console.log("Received HTML:", event.data);
      setHtmlOutput(event.data);
    };
    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket disconnected");

    setSocket(ws);
    return () => ws.close();
  }, []);

  const handleMarkdownChange = (event) => {
    const text = event.target.value;
    setMarkdown(text);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(text);
    }
  };

  return (
    <div className="container">
      <p className="heading">Markdown to HTML converter</p>
      <div className="editor">
        {/* Markdown Input */}
        <TextArea
          markdown={markdown}
          handleMarkdownChange={handleMarkdownChange}
        />

        {/* HTML Output */}
        <RenderArea
          selectedOption={selectedOption}
          handleRadioChange={handleChange}
          htmlOutput={htmlOutput}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
