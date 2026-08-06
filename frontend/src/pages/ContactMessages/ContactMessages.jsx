import { useEffect, useState } from "react";
import api from "../../api/api";
import "./ContactMessages.css";
import AdminNav from "../../components/AdminNav/AdminNav";

function ContactMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/contact/");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="messages-page">
      <AdminNav />
      <h1>Contact Messages</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactMessages;
