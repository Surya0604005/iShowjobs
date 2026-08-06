import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Archive } from "lucide-react";
import { toast } from "sonner";
import api from "../../api/api";
import "./ManageJobs.css";
import AdminNav from "../../components/AdminNav/AdminNav";

function ManageJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/");
      console.log(res.data);
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${id}`);

      toast.success("Job deleted successfully!");

      fetchJobs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job.");
    }
  };

  const companies = [...new Set(jobs.map((job) => job.company))];
  const locations = [...new Set(jobs.map((job) => job.location))];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.title.toLowerCase().includes(search.toLowerCase());

    const matchesCompany =
      companyFilter === "All" || job.company === companyFilter;

    const matchesLocation =
      locationFilter === "All" || job.location === locationFilter;

    return matchesSearch && matchesCompany && matchesLocation;
  });

  return (
    <div className="manage-jobs">
      <AdminNav />

      <div className="top-bar">
        <h1>Manage Jobs</h1>

        <Link to="/admin/add-job" className="add-btn">
          + Add Job
        </Link>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search company or job..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        >
          <option value="All">All Companies</option>

          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="All">All Locations</option>

          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Company</th>
            <th>Job Title</th>
            <th>Experience</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>
                  <img
                    src={job.thumbnail}
                    alt={job.company}
                    className="job-thumb"
                  />
                </td>

                <td>{job.company}</td>

                <td>{job.title}</td>

                <td>{job.experience}</td>

                <td>{job.location}</td>

                <td>
                  <button
                    className="edit"
                    onClick={() => navigate(`/admin/edit-job/${job.id}`)}
                  >
                    <Pencil size={18} />
                  </button>

                  <button className="archive">
                    <Archive size={18} />
                  </button>

                  <button
                    className="delete"
                    onClick={() => handleDelete(job.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-jobs">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageJobs;
