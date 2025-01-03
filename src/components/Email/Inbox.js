import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { database } from '../DataBase/FireBaseConfig';
import { ref, onValue } from "firebase/database";
import "./Inbox.css"; // You can add your own styles here

const Inbox = () => {
  const gmail = useSelector((state) => state.auth.gmail); // Get logged-in user's Gmail
  const [emails, setEmails] = useState([]); // State to store fetched emails

  useEffect(() => {
    // Reference to the "emails" node in the Firebase Realtime Database
    const emailRef = ref(database, "emails");

    // Listen for changes in the "emails" data
    onValue(emailRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Filter emails where "to" matches the logged-in user's Gmail
        const userEmails = Object.values(data).filter((email) => email.to === gmail);
        setEmails(userEmails); // Set emails that belong to the user
      }
    });
  }, [gmail]); // Dependency array ensures the effect runs when "gmail" changes

  return (
    <div className="inbox-container">
      <h2>Inbox</h2>
      <div className="email-list">
        {emails.length === 0 ? (
          <p>No emails found.</p>
        ) : (
          emails.map((email, index) => (
            <div key={index} className="email-item">
              <div className="email-subject">
                <strong>Subject:</strong> {email.subject}
              </div>
              <div className="email-from">
                <strong>From:</strong> {email.from}
              </div>
              <div className="email-content">
                <strong>Content:</strong> {email.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inbox;
