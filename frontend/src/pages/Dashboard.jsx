import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsAsync } from "../features/projects/porjectsSlice";
import { Link } from "react-router-dom";
import { fetchTasksAsync } from "../features/tasks/tasksSlice";
import TaskList from "../components/tasks/TaskList";
import ProjectList from "../components/projects/ProjectList";
import CreateProjectButton from "../components/projects/CreateProjectButton";
import CreateTaskButton from "../components/tasks/CreateTaskButton";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectsAsync());
    dispatch(fetchTasksAsync());
  }, []);

  const { projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);

  return (
    <div>
      <h5 className="display-5 fw-semibold text-center">Dashboard</h5>
      <div>
        <section>
          <div className="d-flex justify-content-between">
            <div>
              <h6 className="display-6 fw-semibold">Projects</h6>
            </div>
            <div>
              <CreateProjectButton />
            </div>
          </div>
          <ProjectList projects={projects} />
        </section>
        <section>
          <div className="d-flex justify-content-between">
            <div>
              <h6 className="display-6 fw-semibold">Tasks</h6>
            </div>
            <div>
              <CreateTaskButton />
            </div>
          </div>
          <div>
            <TaskList tasks={tasks} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
