import React from "react";
import '../styles/landingPage.css'
function TextArea({markdown, handleMarkdownChange}) {
  return (
    <textarea
      value={markdown}
      onChange={handleMarkdownChange}
      placeholder="Type Markdown here..."
      className="textarea"
    />
  );
}

export default TextArea;
