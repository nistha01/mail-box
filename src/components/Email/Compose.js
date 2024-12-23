import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "./Compose.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Compose = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  const sendEmail = () => {
    console.log("Sending Email...");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Content:", editorState.getCurrentContent().getPlainText());
    alert("Email Sent!");
  };

  const cancelEmail = () => {
    setTo("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div className="email-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <ul>
          <li>Inbox</li>
          <li>Sent</li>
          <li>Compose</li>
        </ul>
      </nav>

      {/* Email Editor */}
      <div className="email-editor">
        <div className="email-editor-header">Compose Email</div>
        <div className="email-editor-fields">
          <div className="field">
            <label htmlFor="to">To:</label>
            <input
              type="email"
              id="to"
              placeholder="Recipient's email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              placeholder="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbar-class"
          wrapperClassName="email-editor-wrapper"
          editorClassName="email-editor-body"
          onEditorStateChange={onEditorStateChange}
        />
      </div>

      {/* Fixed Footer Buttons */}
      <div className="email-editor-footer">
        <button className="cancel-button" onClick={cancelEmail}>
          Cancel
        </button>
        <button onClick={sendEmail}>Send</button>
      </div>
    </div>
  );
};

export default Compose;
