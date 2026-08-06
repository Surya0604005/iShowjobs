import { Briefcase, Home, Target } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About iShowJobs</h1>

        <p>
          iShowJobs helps students, freshers, and professionals discover genuine
          job opportunities with easy-to-understand video explanations and
          official application links.
        </p>
      </section>

      <section className="about-grid">
        {/* YouTube Card */}
        <div
          className="about-card"
          onClick={() =>
            window.open(
              "https://www.youtube.com/channel/UCEVT1sE9Y1KjNaJUXUB70kQ",
              "_blank",
            )
          }
        >
          <FaYoutube size={40} color="#FF0000" />

          <h3>YouTube Channel</h3>

          <p>
            Watch detailed hiring videos, interview tips, recruitment updates,
            and complete application guidance on our YouTube channel.
          </p>
        </div>

        {/* Jobs Card */}
        <div className="about-card" onClick={() => navigate("/jobs")}>
          <Briefcase size={40} color="#2563eb" />

          <h3>Browse Jobs</h3>

          <p>
            Explore the latest job openings from top companies with verified
            application links and complete hiring information.
          </p>
        </div>

        {/* Home Card */}
        <div className="about-card" onClick={() => navigate("/")}>
          <Home size={40} color="#16a34a" />

          <h3>Home</h3>

          <p>
            Return to the homepage to discover featured jobs, search
            opportunities, and stay updated with the newest hiring trends.
          </p>
        </div>
      </section>

      <section className="mission">
        <Target size={48} />

        <h2>Our Mission</h2>

        <p>
          To make job searching simple, reliable, and accessible by combining
          verified hiring updates with detailed YouTube guidance.
        </p>
      </section>

      <section className="about-cta">
        <h2>Ready to Find Your Next Job?</h2>

        <Link to="/jobs">
          <button>Browse Jobs</button>
        </Link>
      </section>
    </div>
  );
}

export default About;
