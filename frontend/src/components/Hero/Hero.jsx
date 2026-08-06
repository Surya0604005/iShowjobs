import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-tag">🚀 Trusted Job Updates</span>

        <h1>Find Your Dream Job Faster.</h1>

        <p>
          Daily hiring updates from top companies with detailed YouTube
          explanations and direct apply links.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => navigate("/jobs")}>
            Browse Latest Jobs
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              window.open(
                "https://www.youtube.com/channel/UCEVT1sE9Y1KjNaJUXUB70kQ?sub_confirmation=1",
                "_blank",
              )
            }
          >
            Subscribe on YouTube
          </button>
        </div>
      </div>

      <div className="hero-right">
        <img src="/assets/thumbnails/Hero.jpg" alt="Featured Hiring" />
      </div>
    </section>
  );
}

export default Hero;
