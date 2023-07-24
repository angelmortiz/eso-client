import { useNavigate } from "react-router-dom";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const ExerciseInfoCard = (props) => {
  const navigateTo = useNavigate();
  const { info } = props;

  const navigateToExercise = () => {
    navigateTo(`/activities/exercise/${info._id}`);
  };

  return (
    <li
      className="col-span-1 flex cursor-pointer flex-col items-start justify-center divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
      onClick={navigateToExercise}
    >
      <div className="flex items-center justify-center gap-6 px-6 py-4">
        <img
          className="mx-auto h-24 w-24 flex-shrink-0 rounded-full border shadow"
          src={info.linkToThumbnail}
          alt={info.name}
        />
        <div className="flex flex-1 flex-col text-left">
          <h3 className="text-md font-medium text-gray-900">{info.name}</h3>

          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">Muscle</dt>
            <dd className="text-sm text-gray-500">For: {info.mainMuscle.name}</dd>
            <dt className="sr-only">Equipment</dt>
            <dd className="text-sm text-gray-500">Using: {info.equipments[0]?.name}</dd>
            <dt className="sr-only">Type</dt>
            <dd className="mt-3">
              {/* changes tag color based on program type */}
              <span
                className={classNames(
                  "rounded-lg  px-2 py-1 text-xs font-medium",
                  info.types[0] === "Strength"
                    ? "bg-cyan-100 text-cyan-800"
                    : info.types[0] === "HIIT"
                    ? "bg-teal-100 text-teal-800"
                    : info.types[0] === "Cardio"
                    ? "bg-green-100 text-green-800"
                    : "bg-indigo-100 text-indigo-800"
                )}
              >
                {info.types[0]}
              </span>
            </dd>
          </dl>
        </div>
      </div>
    </li>
  );
};

export default ExerciseInfoCard;
