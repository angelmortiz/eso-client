import { useEffect, useState } from 'react';
import { fetchAllMuscles } from '../../../../util/apis/activities/muscles/musclesApis';
import GridView from '../../../UI/Grids/GridView';
import MuscleInfoCard from './MuscleInfoCard';

const Muscles = (props) => {
  const [muscles, setMuscles] = useState([]);

  useEffect(() => {
    fetchAllMuscles().then((response) => {
      console.log('response: ', response);

      if (!response || !response.isSuccess) return;
      setMuscles(response.body);
    });
  }, []);

  const addInfoCards = () => {
    let infoCards = [];
    infoCards = muscles.map((muscle) => {
      return <MuscleInfoCard key={muscle._id} info={muscle} />;
    });
    return infoCards;
  };

  return <GridView title="Muscles">
    {addInfoCards()}
  </GridView>;
};

export default Muscles;
