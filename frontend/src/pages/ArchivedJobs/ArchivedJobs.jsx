import { RotateCcw, Trash2 } from "lucide-react";
import "./ArchivedJobs.css";

const archivedJobs = [
  {
    id: 1,
    company: "Amazon",
    title: "Cloud Support Associate",
    location: "Hyderabad",
  },
  {
    id: 2,
    company: "Infosys",
    title: "System Engineer",
    location: "Bangalore",
  },
];

function ArchivedJobs() {
  return (
    <div className="archived-page">
      <div className="page-header">
        <h1>Archived Jobs</h1>
      </div>

      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {archivedJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.company}</td>

              <td>{job.title}</td>

              <td>{job.location}</td>

              <td>
                <button className="restore">
                  <RotateCcw size={18} />
                </button>

                <button className="delete">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArchivedJobs;
