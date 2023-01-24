import InfoCard from "../../../UI/Cards/InfoCard";
import CardGrid from "../../../UI/Grids/CardGrid";
import  classes from './Exercises.module.css';
import { fetchAllExercises } from "../../../../util/apis/exercises/exercisesApis"
import { useState, useEffect } from "react";
import { fetchAllEquipmentNames } from '../../../../util/apis/equipments/equipmentsApis';
import { fetchAllMuscleNames } from '../../../../util/apis/muscles/musclesApis';

const Exercises = props => {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] =  useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [muscleFilterOptions, setMuscleFiltersOptions] = useState([]);
    const [selectedMuscle, setSelectedMuscle] = useState("");
    const [equipmentFilterOptions, setEquipmentFilterOptions] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState("");
    const [typeFilterOptions, setTypeFilterOptions] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        fetchAllExercises().then(response => { 
            console.log('response: ', response);

            if (!response || !response.isSuccess) return;
            setExercises(response.body);
        });
    }, []);

    useEffect(() => {
        fetchAllMuscleNames().then(response => { 
            if (!response || !response.isSuccess) return;

            //adds an empty default option
            response.body.unshift({_id: "", name: "-- No filter --"});
            setMuscleFiltersOptions(response.body);
        });

        fetchAllEquipmentNames().then(response => { 
            if (!response || !response.isSuccess) return;

            //adds an empty default option
            response.body.unshift({_id: "", name: "-- No filter --"});
            setEquipmentFilterOptions(response.body);
        });
    }, []);


    useEffect(() => {
        setTypeFilterOptions([
            // TODO: Pull values from backend or global variable
            {value: "", label:"-- No filter --"},
            {value: "HIIT", label:"HIIT"},
            {value: "Strength", label:"Strength"},
        ]);
    }, []);

    //if exercises change, update the filtered exercises as well
    useEffect(() => {
        setFilteredExercises(exercises);
    }, [exercises]);

    //filter exercises based on selections
    useEffect(() => {
        setFilteredExercises(() => {
            return exercises.filter(ex => {
                //only filters if a selection has been made on the dropdowns
                let muscleResult = selectedMuscle ? ex.mainMuscle?.muscleId === selectedMuscle : true;
                let equipmentResult = selectedEquipment ? ex.equipments[0]?.equipmentId === selectedEquipment : true;
                let typeResult = selectedType ? ex.types[0] === selectedType : true;
                return muscleResult && equipmentResult && typeResult;
            });
        });
    }, [exercises, selectedMuscle, selectedEquipment, selectedType]);

    const addInfoCards = () => {
        let infoCards = [];
        infoCards = filteredExercises.map(exercise => {
            return <InfoCard key={exercise._id} info={exercise} />
        });
        return infoCards;
    };

    const clearFilters = () => {
        setSelectedMuscle("");
        setSelectedEquipment("");
        setSelectedType("");
        setFilteredExercises(exercises);
    };

    return <CardGrid title="Exercises">
        {/* FILTERS */}
        <section className={classes['filters-section']}>
            <button className={classes['show-btn']} onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? 'Hide filters' : 'Show filters'}
            </button>
            {showFilters && <hr className={classes['separator']}/>}
            {/* Shows the filters only when the user opens the tray */}
            {   showFilters &&
                <div className={classes['filters-selects']}> 
                    {/* MUSCLE FILTER */}
                    <div className={classes['filter']}>
                        <label htmlFor="select-muscle" className={classes['text-label']}>Muscle:</label>
                        <select key="select-muscle" name="select-muscle" className={classes['select-input']} value={selectedMuscle} onChange={event => setSelectedMuscle(event.target.value)}>
                            {muscleFilterOptions.map((option, index) => {
                                return <option key={`muscle_${option.name}_${index+1}`} value={option._id}>{option.name}</option>
                            })}
                        </select>
                    </div>
                    {/* EQUIPMENT FILTER */}
                    <div className={classes['filter']}>
                        <label htmlFor="select-equipment" className={classes['text-label']}>Equipment:</label>
                        <select key="select-equipment" name="select-equipment" className={classes['select-input']} value={selectedEquipment} onChange={event => setSelectedEquipment(event.target.value)}>
                            {equipmentFilterOptions.map((option, index) => {
                                return <option key={`equipment_${option.name}_${index+1}`} value={option._id}>{option.name}</option>
                            })}
                        </select>
                    </div>
                    {/* TYPE FILTER */}
                    <div className={classes['filter']}>
                        <label htmlFor="select-type" className={classes['text-label']}>Type:</label>
                        <select key="select-type" name="select-type" className={classes['select-input']} value={selectedType} onChange={event => setSelectedType(event.target.value)}>
                            {typeFilterOptions.map((option, index) => {
                                return <option key={`type_${option.value}_${index+1}`} value={option.value}>{option.label}</option>
                            })}
                        </select>
                    </div>
                    <button className={classes['clear-btn']} onClick={clearFilters}>Clear filters</button>
                </div>
            }
            {showFilters && <hr className={`${classes['separator']} ${classes['separator-bottom']}`}/>}
        </section>
        {addInfoCards()}
    </CardGrid>
};

export default Exercises;