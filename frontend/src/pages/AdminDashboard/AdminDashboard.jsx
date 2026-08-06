import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Building2,
  MapPin,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";
import api from "../../api/api";
import "./AdminDashboard.css";
import { toast } from "sonner";
const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];
import AdminNav from "../../components/AdminNav/AdminNav";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.success("Logged out successfully!");
    navigate("/admin");
  };
  const [jobs, setJobs] = useState([]);

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
    }
  };

  const companies = new Set(jobs.map((job) => job.company));
  const locations = new Set(jobs.map((job) => job.location));
  const companyData = Object.entries(
    jobs.reduce((acc, job) => {
      acc[job.company] = (acc[job.company] || 0) + 1;
      return acc;
    }, {}),
  ).map(([name, jobs]) => ({
    name,
    jobs,
  }));

  const locationData = Object.entries(
    jobs.reduce((acc, job) => {
      acc[job.location] = (acc[job.location] || 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="dashboard">
      <AdminNav />
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage jobs, companies and recruitment updates.</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Briefcase size={40} />
          <h2>{jobs.length}</h2>
          <p>Total Jobs</p>
        </div>

        <div className="stat-card">
          <Building2 size={40} />
          <h2>{companies.size}</h2>
          <p>Companies</p>
        </div>

        <div className="stat-card">
          <MapPin size={40} />
          <h2>{locations.size}</h2>
          <p>Locations</p>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/admin/add-job" className="action-btn">
          <Plus size={20} />
          Add Job
        </Link>

        <Link to="/admin/manage-jobs" className="action-btn">
          <Settings size={20} />
          Manage Jobs
        </Link>

        <Link to="/admin/messages" className="action-btn">
          📩 Contact Messages
        </Link>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h2>Jobs by Company</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jobs" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Jobs by Location</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={locationData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {locationData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-jobs">
        <h2>Recent Jobs</h2>

        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>
            {jobs.slice(0, 5).map((job) => (
              <tr key={job.id}>
                <td>{job.company}</td>
                <td>{job.title}</td>
                <td>{job.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
