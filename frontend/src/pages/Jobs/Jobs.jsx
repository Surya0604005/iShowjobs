import { useEffect, useState } from "react";
import api from "../../api/api";
import JobCard from "../../components/JobCard/JobCard";
import "./Jobs.css";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/");
      console.log(res.data);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async () => {
    try {
      if (search.trim() === "") {
        fetchJobs();
        return;
      }

      const res = await api.get(`/jobs/search/${search}`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterJobs = async () => {
    try {
      if (location === "" && experience === "") {
        fetchJobs();
        return;
      }

      const res = await api.get(
        `/jobs/filter/?location=${location}&experience=${experience}`,
      );

      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setExperience("");
    fetchJobs();
  };

  if (loading) return <Loader />;

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Latest Jobs</h1>
        <p>Explore the newest opportunities from top companies.</p>
      </div>

      <p className="jobs-count">
        Showing <strong>{jobs.length}</strong>{" "}
        {jobs.length === 1 ? "Job" : "Jobs"}
      </p>

      <div className="filter-card">
        {/* Search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search company or job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={searchJobs}>Search</button>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filter-selects">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option>Hyderabad</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Pune</option>
              <option>Remote</option>
            </select>

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="">All Experience</option>
              <option>Freshers</option>
              <option>0-2 Years</option>
              <option>1-3 Years</option>
              <option>2-5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>

          <div className="filter-buttons">
            <button onClick={filterJobs}>Apply Filters</button>

            <button className="reset-btn" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="jobs-grid">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

export default Jobs;
