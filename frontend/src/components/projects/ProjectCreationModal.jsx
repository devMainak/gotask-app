import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewProjectAsync } from "../../features/projects/porjectsSlice";

const ProjectCreationModal = ({ handleClose }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");

  const dispatch = useDispatch();

  const handleAlert = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(""), 2000);
  };

  const handleCreateProject = async () => {
    try {
      if (projectName && description) {
        const projectDetails = { name: projectName, description };
        const resultAction = await dispatch(addNewProjectAsync(projectDetails));
        if (addNewProjectAsync.fulfilled.match(resultAction)) {
          setProjectName("");
          setDescription("");
          handleAlert("Project created successfully.");
        } else {
          handleAlert("Failed to create project.");
        }
      } else {
        handleAlert("Fill all details.");
      }
    } catch (error) {
      handleAlert("Failed to create project");
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Project</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="project-name" className="form-lable">
                Project Name
              </label>
              <div className="input-group">
                <input
                  id="project-name"
                  onChange={(e) => setProjectName(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter Project Name"
                  value={projectName}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-lable">
                Project Description
              </label>
              <div className="input-group">
                <textarea
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  maxLength={100}
                  rows={3}
                  required
                  placeholder="Enter Project Description"
                  value={description}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger fw-semibold"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning fw-semibold"
              onClick={handleCreateProject}
            >
              Create
            </button>
          </div>
          {alert && (
          <div
            className="alert alert-warning mt-3 alerts fs-5 fw-semibold"
            role="alert"
          >
            {alert}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCreationModal;
