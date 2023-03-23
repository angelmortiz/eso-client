import { useNavigate } from 'react-router-dom';

const EquipmentInfoCard = (props) => {
  const navigateTo = useNavigate();
  const { info } = props;

  const navigateToEquipment = () => {
    navigateTo(`/activities/equipment/${info._id}`);
  };

  return (
    <li
      className="col-span-1 flex cursor-pointer flex-col items-start justify-center divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
      onClick={navigateToEquipment}
    >
      <div className="flex items-center justify-center gap-6 px-6 py-4">
        <img
          className="mx-auto h-24 w-24 flex-shrink-0 rounded-full border shadow"
          src={info.linkToImage}
          alt={info.name}
        />
        <div className="flex flex-1 flex-col text-left">
          <h3 className="text-md font-medium text-gray-900">{info.name}</h3>

          <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Alternative </dt>
            <dd className="text-sm text-gray-500">{info.alternativeName}</dd>
          </dl>
        </div>
      </div>
    </li>
  );
};

export default EquipmentInfoCard;
