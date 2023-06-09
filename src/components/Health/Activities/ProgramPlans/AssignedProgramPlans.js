import { useEffect, useState } from "react";
import { fetchProgramPlansAssignedToUser } from "../../../../util/apis/activities/programPlans/programPlansApis";
import ProgramPlanInfoCard from "./ProgramPlanInfoCard";
import ProgramsGridView from "../../../UI/Grids/ProgramsGridView";

const AssignedProgramPlans = (props) => {
  const [assignedProgramPlans, setAssignedProgramPlans] = useState();

  useEffect(() => {
    fetchProgramPlansAssignedToUser().then((response) => {
      if (!response || !response.isSuccess) return;

      //TODO: add property to assigned programs to flag the active ones and next
      //console.log('Response: ', response);
      setAssignedProgramPlans(response.body);
    });
  }, []);

  const addInfoCards = () => {
    let infoCards = [];
    infoCards = assignedProgramPlans?.map((program) => {
      return (
        <ProgramPlanInfoCard
          programPlan={program}
          activateStart={true}
          key={`program-plan_next_${program._id}`}
        />
      );
    });
    return infoCards;
  };

  return (
    <ProgramsGridView title="Assigned Plans">{addInfoCards()}</ProgramsGridView>
  );
};

export default AssignedProgramPlans;
