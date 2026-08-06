import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import "./AdminNav.css";

function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.success("Logged out successfully!");
    navigate("/admin");
  };

  return (
    <div className="admin-nav">
      <Link to="/admin/dashboard">
        <LayoutDashboard size={18} />
        Dashboard
      </Link>

      <Link to="/admin/add-job">
        <PlusCircle size={18} />
        Add Job
      </Link>

      <Link to="/admin/manage-jobs">
        <Briefcase size={18} />
        Manage Jobs
      </Link>

      <Link to="/admin/messages">
        <MessageSquare size={18} />
        Messages
      </Link>

      <button onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default AdminNav;
