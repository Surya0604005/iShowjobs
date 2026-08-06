import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import api from "../../api/api";
import "../AddJob/AddJob.css";
import AdminNav from "../../components/AdminNav/AdminNav";

function EditJob() {
  const { id } = useParams();
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

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load job details.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = form.thumbnail;

      // Upload new image if selected
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = `http://127.0.0.1:8000${uploadRes.data.image_url}`;
      }

      await api.put(`/jobs/${id}`, {
        ...form,
        thumbnail: imageUrl,
      });

      toast.success("Job Updated Successfully!");

      setTimeout(() => {
        navigate("/admin/manage-jobs");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job.");
    }
  };

  return (
    <div className="add-job-page">
      <AdminNav />

      <form className="add-job-form" onSubmit={handleSubmit}>
        <h1>Edit Job</h1>

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
        />

        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
          required
        />

        <div className="image-upload">
          {form.thumbnail && (
            <img
              src={form.thumbnail}
              alt="Preview"
              style={{
                width: "200px",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <input
          name="youtube"
          placeholder="YouTube Link"
          value={form.youtube}
          onChange={handleChange}
          required
        />

        <input
          name="apply"
          placeholder="Apply Link"
          value={form.apply}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <textarea
          name="eligibility"
          placeholder="Eligibility"
          value={form.eligibility}
          onChange={handleChange}
          required
        />

        <textarea
          name="skills"
          placeholder="Skills Required"
          value={form.skills}
          onChange={handleChange}
          required
        />

        <textarea
          name="process"
          placeholder="Selection Process"
          value={form.process}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Job</button>

        <button type="button" onClick={() => navigate("/admin/manage-jobs")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditJob;
