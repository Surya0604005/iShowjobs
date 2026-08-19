import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./AddJob.css";
import AdminNav from "../../components/AdminNav/AdminNav";
import { toast } from "sonner";

function AddJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    title: "",
    location: "",
    experience: "",
    thumbnail: "",
    youtube: "",
    apply: "",
    description: "",
    eligibility: "",
    skills: "",
    process: "",
  });

  const [image, setImage] = useState(null);
  const [customLocation, setCustomLocation] = useState("");
  const [customExperience, setCustomExperience] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // ==========================================
      // 1. Upload image to Aiven MySQL
      // ==========================================
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("IMAGE UPLOAD RESPONSE:", uploadRes.data);

        imageUrl = uploadRes.data.image_url;
      }

      // ==========================================
      // 2. Create job
      // ==========================================
      const jobRes = await api.post("/jobs/", {
        ...form,

        location: form.location === "Other" ? customLocation : form.location,

        experience:
          form.experience === "Other" ? customExperience : form.experience,

        thumbnail: imageUrl,
      });

      console.log("JOB CREATED:", jobRes.data);

      toast.success("Job Added Successfully!");

      navigate("/admin/manage-jobs");
    } catch (err) {
      console.error("ADD JOB ERROR:", err);
      console.error("SERVER RESPONSE:", err.response?.data);

      toast.error("Failed to add job.");
    }
  };

  return (
    <div className="add-job-page">
      <AdminNav />

      <form className="add-job-form" onSubmit={handleSubmit}>
        <h1>Add Job</h1>

        <input
          name="company"
          placeholder="Company"
          onChange={handleChange}
          required
        />

        <input
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          required
        />

        <select
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        >
          <option value="">Select Location</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Pune">Pune</option>
          <option value="Noida">Noida</option>
          <option value="Gurgaon">Gurgaon</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Remote">Remote</option>
          <option value="Other">Other</option>
        </select>

        {form.location === "Other" && (
          <input
            type="text"
            placeholder="Enter Location"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            required
          />
        )}

        <select
          name="experience"
          value={form.experience}
          onChange={handleChange}
          required
        >
          <option value="">Select Experience</option>
          <option value="Freshers">Freshers</option>
          <option value="0-2 Years">0-2 Years</option>
          <option value="1-3 Years">1-3 Years</option>
          <option value="2-5 Years">2-5 Years</option>
          <option value="5+ Years">5+ Years</option>
          <option value="Other">Other</option>
        </select>

        {form.experience === "Other" && (
          <input
            type="text"
            placeholder="Enter Experience (e.g. 7-10 Years)"
            value={customExperience}
            onChange={(e) => setCustomExperience(e.target.value)}
            required
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <input
          name="youtube"
          placeholder="YouTube Link"
          onChange={handleChange}
          required
        />

        <input
          name="apply"
          placeholder="Apply Link"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
          required
        />

        <textarea
          name="eligibility"
          placeholder="Eligibility"
          onChange={handleChange}
          required
        />

        <textarea
          name="skills"
          placeholder="Skills"
          onChange={handleChange}
          required
        />

        <textarea
          name="process"
          placeholder="Selection Process"
          onChange={handleChange}
          required
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;
