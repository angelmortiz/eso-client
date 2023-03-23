import { useEffect, useState } from "react";
import { fetchAllEquipments } from "../../../../util/apis/activities/equipments/equipmentsApis";
import GridView from "../../../UI/Grids/GridView";
import EquipmentInfoCard from "./EquipmentInfoCard";

const Equipments = (props) => {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    fetchAllEquipments().then((response) => {
      //console.log('Response: ', response);

      if (!response || !response.isSuccess) return;
      setEquipments(response.body);
    });
  }, []);

  const addInfoCards = () => {
    let infoCards = [];
    infoCards = equipments.map((equipment) => {
      return <EquipmentInfoCard key={equipment._id} info={equipment} />;
    });
    return infoCards;
  };

  return <GridView title="Equipments">{addInfoCards()}</GridView>;
};

export default Equipments;
