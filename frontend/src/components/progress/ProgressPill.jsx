const ProgressPill = ({ status }) => {
  const pillColor = [
    {
      case: "To Do",
      class: "badge rounded-pill text-bg-light",
    },
    {
      case: "In Progress",
      class: "badge rounded-pill text-bg-light",
    },
    {
      case: "Completed",
      class: "badge rounded-pill text-bg-success",
    },
    {
      case: "Blocked",
      class: "badge rounded-pill text-bg-danger",
    },
  ];

  const currCase = pillColor.find((pair) => pair.case === status);

  return (
    <div>
      <span className={currCase.class}>{currCase.case}</span>
    </div>
  );
};

export default ProgressPill;