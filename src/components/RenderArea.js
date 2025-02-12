import React from "react";

function RenderArea({ selectedOption, handleRadioChange, htmlOutput }) {
  return (
    <div className="preview-container">
      <div style={{ display: "flex" }}>
        <label>
          <input
            type="radio"
            value="html"
            checked={selectedOption === "html"}
            onChange={handleRadioChange}
          />
          HTML
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            value="text"
            checked={selectedOption === "text"}
            onChange={handleRadioChange}
          />
          Text
        </label>
      </div>
      {selectedOption === "text" ? (
        <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
      ) : (
        <pre>{htmlOutput}</pre>
      )}
    </div>
  );
}

export default RenderArea;
