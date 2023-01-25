import InfoCard from "../../../UI/Cards/InfoCard";
import GridView from "../../../UI/Grids/GridView";
import styles from '../../../UI/General/CSS/GridContent.module.css';
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

    return <GridView title="Exercises">
        {/* FILTERS */}
        <section className={styles['filters-section']}>
            <button className={styles['show-btn']} onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? 'Hide filters' : 'Show filters'}
            </button>
            {showFilters && <hr className={styles['separator']}/>}
            {/* Shows the filters only when the user opens the tray */}
            {   showFilters &&
                <div className={styles['filters-selects']}> 
                    {/* MUSCLE FILTER */}
                    <div className={styles['filter']}>
                        <label htmlFor="select-muscle" className={styles['text-label']}>Muscle:</label>
                        <select key="select-muscle" name="select-muscle" className={styles['select-input']} value={selectedMuscle} onChange={event => setSelectedMuscle(event.target.value)}>
                            {muscleFilterOptions.map((option, index) => {
                                return <option key={`muscle_${option.name}_${index+1}`} value={option._id}>{option.name}</option>
                            })}
                        </select>
                    </div>
                    {/* EQUIPMENT FILTER */}
                    <div className={styles['filter']}>
                        <label htmlFor="select-equipment" className={styles['text-label']}>Equipment:</label>
                        <select key="select-equipment" name="select-equipment" className={styles['select-input']} value={selectedEquipment} onChange={event => setSelectedEquipment(event.target.value)}>
                            {equipmentFilterOptions.map((option, index) => {
                                return <option key={`equipment_${option.name}_${index+1}`} value={option._id}>{option.name}</option>
                            })}
                        </select>
                    </div>
                    {/* TYPE FILTER */}
                    <div className={styles['filter']}>
                        <label htmlFor="select-type" className={styles['text-label']}>Type:</label>
                        <select key="select-type" name="select-type" className={styles['select-input']} value={selectedType} onChange={event => setSelectedType(event.target.value)}>
                            {typeFilterOptions.map((option, index) => {
                                return <option key={`type_${option.value}_${index+1}`} value={option.value}>{option.label}</option>
                            })}
                        </select>
                    </div>
                    <button className={styles['clear-btn']} onClick={clearFilters}>Clear filters</button>
                </div>
            }
            {showFilters && <hr className={`${styles['separator']} ${styles['separator-bottom']}`}/>}
        </section>
        {addInfoCards()}
    </GridView>
};

export default Exercises;