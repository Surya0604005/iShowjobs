import { useEffect, useState } from "react";
import api from "../../api/api";
import "./Home.css";

import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import JobCard from "../../components/JobCard/JobCard";
import Loader from "../../components/Loader/Loader";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All");
  const [location, setLocation] = useState("All");
  const [experience, setExperience] = useState("All");

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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesCompany = company === "All" || job.company === company;

    const matchesLocation = location === "All" || job.location === location;

    const matchesExperience =
      experience === "All" || job.experience === experience;

    return (
      matchesSearch && matchesCompany && matchesLocation && matchesExperience
    );
  });

  if (loading) return <Loader />;

  return (
    <>
      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
        company={company}
        setCompany={setCompany}
        location={location}
        setLocation={setLocation}
        experience={experience}
        setExperience={setExperience}
      />

      <section className="latest-jobs">
        <h2>Latest Jobs</h2>

        <div className="jobs-grid">
          {filteredJobs.length > 0 ? (
            filteredJobs
              .slice(0, 4)
              .map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="no-jobs">
              <h2>No Jobs Found</h2>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
