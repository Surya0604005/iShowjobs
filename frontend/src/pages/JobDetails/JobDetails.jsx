import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Briefcase } from "lucide-react";
import api from "../../api/api";
import Loader from "../../components/Loader/Loader";
import "./JobDetails.css";
import { FaYoutube } from "react-icons/fa";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!job) return <h2 className="not-found">Job Not Found</h2>;

  return (
    <div className="job-details-page">
      <img src={job.thumbnail} alt={job.title} className="job-banner" />

      <div className="job-header">
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>
      </div>

      <div className="job-meta">
        <span>
          <MapPin size={18} />
          {job.location}
        </span>

        <span>
          <Briefcase size={18} />
          {job.experience}
        </span>
      </div>

      <div className="action-buttons">
        <a
          href={job.apply}
          target="_blank"
          rel="noreferrer"
          className="apply-btn"
        >
          Apply Now →
        </a>

        <a
          href={job.youtube}
          target="_blank"
          rel="noreferrer"
          className="video-btn"
        >
          <FaYoutube size={18} />
          Watch Explanation
        </a>
      </div>

      <div className="details-grid">
        <div className="details-card">
          <h3>📄 Job Description</h3>
          <p>{job.description}</p>
        </div>

        <div className="details-card">
          <h3>🎓 Eligibility</h3>
          <p>{job.eligibility}</p>
        </div>

        <div className="details-card">
          <h3>🛠 Skills Required</h3>
          <p>{job.skills}</p>
        </div>

        <div className="details-card">
          <h3>📋 Selection Process</h3>
          <p>{job.process}</p>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
