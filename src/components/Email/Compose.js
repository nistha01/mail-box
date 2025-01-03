import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "./Compose.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
import { database } from '../DataBase/FireBaseConfig';
import { ref, push } from "firebase/database";

const Compose = () => {
  const gmail = useSelector((state) => state.auth.gmail);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [from] = useState(gmail);

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  const sendEmail = () => {
    const content = editorState.getCurrentContent().getPlainText();
    const timestamp = new Date().toISOString();

    const emailData = {
      to,
      from,
      subject,
      content,
      timestamp,
    };

    const emailRef = ref(database, "emails");
    push(emailRef, emailData)
      .then(() => {
        alert("Email Sent and Stored!");
        cancelEmail();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send email. Please try again.");
      });
  };

  const cancelEmail = () => {
    setTo("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div className="compose-container">
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

      {/* Footer Buttons */}
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
