import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import "./JobCard.css";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <img src={job.thumbnail} alt={job.title} className="job-thumbnail" />

      <div className="job-content">
        {job.isNew && <span className="new-badge">NEW</span>}

        <h3>{job.title}</h3>

        <p className="company">{job.company}</p>

        <p className="location">
          <MapPin size={16} />
          {job.location}
        </p>

        <Link to={`/job/${job.id}`}>
          <button className="details-btn">View Details →</button>
        </Link>
      </div>
    </div>
  );
}

export default JobCard;
