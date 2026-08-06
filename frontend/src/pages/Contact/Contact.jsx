import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import api from "../../api/api";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/contact/", form);

      toast.success("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Full Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);
      }

      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Have a question, suggestion, or found an issue? We'd love to hear from
          you.
        </p>
      </section>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <Mail size={26} />
            <div>
              <h3>Email</h3>
              <a
                href="mailto:all.blue.hunter.06@gmail.com"
                className="contact-email"
              >
                all.blue.hunter.06@gmail.com
              </a>
            </div>
          </div>

          <div className="info-card">
            <Phone size={26} />
            <div>
              <h3>Phone</h3>
              <p>
                Phone support is currently unavailable. Please reach out via
                email or the contact form for any inquiries.
              </p>
            </div>
          </div>

          <div className="info-card">
            <MapPin size={26} />
            <div>
              <h3>Location</h3>
              <p>Bhimavaram, Andhra Pradesh, India</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            rows="6"
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">
            <Send size={18} />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
