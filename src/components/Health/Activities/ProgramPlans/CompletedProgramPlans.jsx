import { useEffect, useState } from 'react';
import { fetchProgramPlansAssignedToUser } from '../../../../util/apis/activities/programPlans/programPlansApis';
import ProgramPlanInfoCard from './ProgramPlanInfoCard';
import ProgramPlansGridView from '../../../UI/Grids/ProgramPlansGridView';

const CompletedProgramPlans = (props) => {
  const [completedProgramPlans, setCompletedProgramPlans] = useState();

  useEffect(() => {
    fetchProgramPlansAssignedToUser('completed').then((response) => {
      if (!response || !response.isSuccess) return;
      //console.log('Response: ', response);

      setCompletedProgramPlans(response.body);
    });
  }, []);

  const addInfoCards = () => {
    let infoCards = [];
    infoCards = completedProgramPlans?.map((program) => {
      return (
        <ProgramPlanInfoCard
          programPlan={program}
          activateStart={true}
          key={`program-plan_completed_${program._id}`}
        />
      );
    });
    return infoCards;
  };

  return (
    <ProgramPlansGridView title="Completed Plans">
      {addInfoCards()}
    </ProgramPlansGridView>
  );
};

export default CompletedProgramPlans;
