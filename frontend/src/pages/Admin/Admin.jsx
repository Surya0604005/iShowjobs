import "./Admin.css";

function Admin() {
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <form className="admin-form">
        <label>Company Name</label>
        <input type="text" />

        <label>Job Title</label>
        <input type="text" />

        <label>Thumbnail</label>
        <input type="file" />

        <label>Location</label>
        <input type="text" />

        <label>Experience</label>
        <input type="text" />

        <label>Posted</label>
        <input type="text" placeholder="Today" />

        <label>Job Description</label>
        <textarea rows="5"></textarea>

        <label>Eligibility</label>
        <textarea rows="3"></textarea>

        <label>Skills</label>
        <textarea rows="3"></textarea>

        <label>Selection Process</label>
        <textarea rows="3"></textarea>

        <label>YouTube Link</label>
        <input type="url" />

        <label>Apply Link</label>
        <input type="url" />

        <button type="submit">Publish Job</button>
      </form>
    </div>
  );
}

export default Admin;
