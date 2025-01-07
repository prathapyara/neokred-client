import React, { useState, useEffect } from "react";
import axios from "axios";
import "highlight.js/styles/github.css";
import "./App.css"

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const [htmlPreview, setHtmlPreview] = useState("");

  const handleMarkdownChange = (e) => {
    const text = e.target.value;
    setMarkdown(text);
    axios
      .post("http://localhost:5000/api/convert", { markdown: text })
      .then((response) => {
        setHtmlPreview(response.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const hljs = require("highlight.js");
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [htmlPreview]);

  return (
    <div className="container">
      <h1>Real-time Markdown Editor</h1>
      <div className="editor-preview">
        <textarea
          className="editor"
          placeholder="Type your Markdown here..."
          value={markdown}
          onChange={handleMarkdownChange}
        ></textarea>
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: htmlPreview }}
        ></div>
      </div>
    </div>
  );
};

export default App;
