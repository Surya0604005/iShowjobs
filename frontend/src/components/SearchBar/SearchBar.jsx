import { Search, Building2, MapPin, Briefcase } from "lucide-react";
import "./SearchBar.css";

function SearchBar({
  search,
  setSearch,
  company,
  setCompany,
  location,
  setLocation,
  experience,
  setExperience,
}) {
  return (
    <div className="search-wrapper">
      <div className="search-field">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="select-field">
        <Building2 size={18} />
        <select value={company} onChange={(e) => setCompany(e.target.value)}>
          <option value="All">All Companies</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Amazon">Amazon</option>
          <option value="Infosys">Infosys</option>
          <option value="Deloitte">Deloitte</option>
        </select>
      </div>

      <div className="select-field">
        <MapPin size={18} />
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="All">All Locations</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
        </select>
      </div>

      <div className="select-field">
        <Briefcase size={18} />
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="All">All Experience</option>
          <option value="Freshers">Freshers</option>
          <option value="Experienced">Experienced</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
