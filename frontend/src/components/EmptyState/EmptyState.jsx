import { SearchX } from "lucide-react";
import "./EmptyState.css";

function EmptyState({
  title = "No Jobs Found",
  message = "Try changing your search or filters.",
}) {
  return (
    <div className="empty-state">
      <SearchX size={80} />

      <h2>{title}</h2>

      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
