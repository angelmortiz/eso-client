import { useEffect, useState } from "react";
import { fetchAllPrograms } from "../../../../util/apis/activities/programs/programsApis";
import ProgramInfoCard from "./ProgramInfoCard";
import GridView from "../../../UI/Grids/GridView";

const Programs = (props) => {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetchAllPrograms().then(response => { 
            console.log('response: ', response);

            if (!response || !response.isSuccess) return;
            setPrograms(response.body);
        });
    }, []);

    const addInfoCards = () => {
        let infoCards = [];
        infoCards = programs.map(program => {
            return <ProgramInfoCard key={program._id} info={program} />
        });
        return infoCards;
    };

    return <GridView title="Programs">
        {addInfoCards()}
    </GridView>
};

export default Programs;