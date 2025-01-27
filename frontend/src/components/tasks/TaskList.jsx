import { useSelector } from "react-redux";
import ProgressPill from "../progress/ProgressPill";

const TaskList = ({ tasks }) => {
  const { user } = useSelector((state) => state.auth);

  const calculateDueDate = (daysRemaining) => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + daysRemaining);
    return futureDate;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const userTasks = tasks.filter((task) => task.owners.includes(user._id));

  return userTasks.length > 0 ? (
    <div className="row">
      {userTasks.map((task) => {
        const deuDate = calculateDueDate(task.timeToComplete);
        return (
          <div className="col-md-3">
            <div className="card bg-warning-subtle">
              <div className="card-body">
                <ProgressPill status={task.status} />
                <h4 className="card-title">{task.name}</h4>
                <p className="card-text">Due on {formatDate(deuDate)}</p>
                <div>
                  {userTasks.owners.length > 2
                    ? `${userTasks.owners
                        .silce(0, 1)
                        .map((owner) => owner.name)}...`
                    : userTasks.owners.map((owner) => owner.name).join(", ")}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="fs-5 fw-semibold">No tasks found!</p>
  );
};

export default TaskList;
