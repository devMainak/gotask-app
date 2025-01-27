import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-border bg-warning-subtle p-4 vh-100 w-25">
      <div className="mb-3">
        <Link
          className="sidebar-link text-dark fs-4 fw-semibold"
          to="/user/dashboard"
        >
          <i class="text-warning fa-solid fa-table-columns"></i> Dashboard
        </Link>
      </div>
      <div className="mb-3">
        <Link
          className="sidebar-link text-dark fs-4 fw-semibold"
          to="/user/dashboard"
        >
          <i class="text-warning fa-solid fa-table-columns"></i> Projects
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
