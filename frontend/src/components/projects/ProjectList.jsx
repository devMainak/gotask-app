import ProgressPill from "../progress/ProgressPill";

const ProjectList = ({ projects }) => {
  return projects.length > 0 ? (
    <div className="row">
      {projects.map((project) => {
        return (
          <div key={project._id} className="col-md-4">
            <div className="card bg-warning-subtle">
              <div className="card-body">
              <ProgressPill status={project.status} />
                <h4 className="card-title">{project.name}</h4>
                <p className="card-text">{project.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="fs-5 fw-semibold">No projects found!</p>
  );
};

export default ProjectList;
