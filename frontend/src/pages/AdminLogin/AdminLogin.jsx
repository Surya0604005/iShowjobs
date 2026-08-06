import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./AdminLogin.css";
import { toast } from "sonner";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", {
        email,
        password,
      });

      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      toast.success("Login Successful!");

      navigate("/admin/dashboard");
    } catch (err) {
      toast.error("Invalid Username or Password");
      console.error(err);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h1>Admin Login</h1>

        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
