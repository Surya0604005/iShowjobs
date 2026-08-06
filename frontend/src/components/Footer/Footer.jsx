import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>iShowJobs</h2>

        <p className="footer-description">
          Helping students and professionals discover genuine job opportunities
          with verified hiring updates.
        </p>

        <hr />

        <p className="copyright">
          © 2026 iShowJobs. All Rights Reserved by{" "}
          <a
            href="https://www.youtube.com/@MrBlue-4676"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <strong>MrBlue-4676</strong>
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
