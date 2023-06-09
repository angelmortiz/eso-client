import { Link, useNavigate } from "react-router-dom";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const ProgramPlanInfoCard = (props) => {
  const navigateTo = useNavigate();
  const { programPlan } = props;

  const dateFormat = { month: "long", day: "numeric", year: "numeric" };

  const navigateToProgram = () => {
    navigateTo(`/activities/programplan/${programPlan._id}`);
  };

  return (
    /**
     * TODO: Logic to show the time a program plan was started
     * {programPlan.isStarted && (
            <span>
              <strong>Started on:</strong>{' '}
              {new Date(programPlan.startedOn).toLocaleDateString(
                'en-US',
                dateFormat
              )}
            </span>
          )}
     */
    <li
      className="col-span-1 flex cursor-pointer flex-col items-start justify-center divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
      onClick={navigateToProgram}
    >
      <div className="flex items-center justify-center gap-6 px-6 py-4">
        <img
          className="mx-auto h-24 w-24 flex-shrink-0 rounded-full border shadow"
          src={programPlan.program.linkToImage}
          alt={programPlan.program.name}
        />
        <div className="flex flex-1 flex-col text-left">
          <h3 className="text-md font-medium text-gray-900">
            {programPlan.program.name}
          </h3>

          <dl className="mt-3 flex flex-grow flex-col gap-1 justify-between">
            <dt className="sr-only">Sequence</dt>
            <dd className="text-sm text-gray-500">
              <strong>Sequence: </strong>
              {programPlan.program.sequence} ({programPlan.program.duration}{" "}
              weeks)
            </dd>
            <dt className="sr-only">Assigned On</dt>
            <dd className="text-sm text-gray-500">
              <strong>Assigned On:</strong>{" "}
              {new Date(programPlan.assignedOn).toLocaleDateString(
                "en-US",
                dateFormat
              )}
            </dd>
            <dt className="sr-only">Started On</dt>
            <dd className="text-sm text-gray-500">
              <strong>Started On:</strong>{" "}
              {programPlan.startedOn
                ? new Date(programPlan.startedOn).toLocaleDateString(
                    "en-US",
                    dateFormat
                  )
                : "Not Started"}
            </dd>
            <dt className="sr-only">Type</dt>
            <dd className="mt-3">
              {/* changes tag color based on program type */}
              <span
                className={classNames(
                  "rounded-lg  px-2 py-1 text-xs font-medium",
                  programPlan.program.type === "Strength"
                    ? "bg-teal-100 text-teal-800"
                    : programPlan.program.type === "Hypertrophy"
                    ? "bg-cyan-100 text-cyan-800"
                    : programPlan.program.type === "Endurance"
                    ? "bg-green-100 text-green-800"
                    : "bg-indigo-100 text-indigo-800"
                )}
              >
                {programPlan.program.type}
              </span>
            </dd>
          </dl>
        </div>
      </div>
    </li>
  );
};

export default ProgramPlanInfoCard;
