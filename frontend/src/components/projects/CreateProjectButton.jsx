import { useState } from "react";
import ProjectCreationModal from "./ProjectCreationModal";

const CreateProjectButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="p-4">
      <button className="btn btn-warning fw-semibold" onClick={handleOpen}>
        + New Project
      </button>

      {showModal && <ProjectCreationModal handleClose={handleClose} />}

      {showModal && (
        <div className="modal-backdrop fade show" onClick={handleClose}></div>
      )}
    </div>
  );
};

export default CreateProjectButton;
