import IncrementalSelect from '../../../UI/Selects/IncrementalSelect';
import SelectInput from '../../../UI/Selects/SelectInput';
import addClasses from '../../General/CSS/Form.module.css';
import { postExercise } from '../../../../util/apis/exercises/exercisesApis';
import { useEffect, useState} from 'react';
import { fetchAllEquipmentNames } from '../../../../util/apis/equipments/equipmentsApis';
import { fetchAllMuscleNames } from '../../../../util/apis/muscles/musclesApis';
import { useNavigate } from 'react-router-dom';


const AddExercise = props => {
    const navigate = useNavigate();
    const [muscles, setMuscles] = useState([]);
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        fetchAllMuscleNames().then(response => { 
            if (!response || !response.isSuccess) return;
            //adds an empty default option
            response.body.unshift({_id: "", name: "-- Choose a muscle --"});
            setMuscles(response.body);
        });

        fetchAllEquipmentNames().then(response => { 
            if (!response || !response.isSuccess) return;
            //adds an empty default option
            response.body.unshift({_id: "", name: "-- Choose an equipment --"});
            setEquipments(response.body);
        });
    }, []);

    /** FIELDS DATA */
    const difficultyInfo = {
        select: {
            id: "exercise-difficulty",
            name: "difficulty",
            options: [
                {value: "", label:"-- Choose difficulty --"},
                {value: "Easy", label:"Easy"},
                {value: "Intermediate", label:"Intermediate"},
                {value: "Advanced", label:"Advanced"},
            ]
        }
    }

    const compoundMovementInfo = {
        select: {
            id: "exercise-compoundMovement",
            name: "compoundMovement",
            options: [
                {value: "", label:"-- Choose option --"},
                {value: "yes", label:"Yes"},
                {value: "no", label:"No"}
            ]
        }
    }

    const mainMuscleInfo = {
        select: {
            id: "exercise-mainMuscle",
            name: "mainMuscle",
            value: "_id",
            label: "name",
            options: muscles
        }
    };

    const secondaryMusclesInfo = {
        select: {
            id: "exercise-secondaryMuscle",
            name: "secondaryMuscles",
            value: "_id",
            label: "name",
            options: muscles
        },
        button: {
            id: "add-muscle-btn",
            label: "Add muscle"
        }
    };

    const typesInfo = {
        select: {
            id: "exercise-types",
            name: "types",
            options: [
                // TODO: Pull values from backend or global variable
                {value: "", label:"-- Choose a type --"},
                {value: "HIIT", label:"HIIT"},
                {value: "Strength", label:"Strength"},
            ]
        },
        button: {
            id: "add-type-btn",
            label: "Add type"
        }
    };

    const equipmentsInfo = {
        select: {
            id: "exercise-equipments",
            name: "equipments",
            value: "_id",
            label: "name",
            options: equipments
        },
        button: {
            id: "add-equipment-btn",
            label: "Add equipment"
        }
    };
    /** [END] FIELDS DATA */

    /** Functions */
    const addExercise = (event) => {
        event.preventDefault();
        const formVals = getValuesFromForm(event.target.elements);

        postExercise(formVals).then(response => { 
            console.log("Response: ", response);
            if (response.isSuccess) {
                // TODO: Navigate to the just added exercise id
                navigate(`/activities/exercises/`);
            }
        });
    };

    const getValuesFromForm = (elements) => {
        const values = {};
        values.name = elements.name.value;
        values.alternativeName = elements.alternativeName.value;
        values.difficulty = elements.difficulty.value;
        values.compoundMovement = elements.compoundMovement.value === 'yes';
        values.linkToImage = elements.linkToImage.value;
        values.linkToVideo = elements.linkToVideo.value;
        values.mainMuscle = elements.mainMuscle.value;
        
        //multi-select options
        values.secondaryMuscles = extractMultiOptionValues(elements.secondaryMuscles);
        values.types = extractMultiOptionValues(elements.types);
        values.equipments = extractMultiOptionValues(elements.equipments);

        //maps the id of each selection to its name
        values.mainMuscle = values.mainMuscle 
            ? mapIdsToNames([values.mainMuscle], muscles, "muscleId", "muscleName")[0] 
            : {};
        values.secondaryMuscles = mapIdsToNames(values.secondaryMuscles, muscles, "muscleId", "muscleName");
        values.equipments = mapIdsToNames(values.equipments, equipments, "equipmentId", "equipmentName");

        return values;
    };

    const extractMultiOptionValues = (elements) => {
        //if there is only one select dropdown, it adds the HTMLSelectElement to an array before extracting the value.
        //if there are multiple select dropdowns, converts the RadioNodeList into an array (to later use .map()).
        elements = Object.prototype.toString.call(elements).includes('HTMLSelectElement') ?
            [elements] : [...elements];
        
        let values = elements.map(element => { return element.value; });
        values = values.filter(v => v); //removes empty selections
        values = [...new Set(values)]; //removes duplicate values
        return values;
    };

    const mapIdsToNames = (values, mapArr, idProperty, nameProperty) => {
         //maps values to objects of ids and names (required for backend)
         return values.map(id => {
            const name = mapArr.find(arr => arr._id === id)?.name;
            return {[idProperty]: id, [nameProperty]: name};
        });
    };

    /** Render */
    return <section className={addClasses['main-section']}>
        <form id="add-exercise-form"  onSubmit={addExercise} className={addClasses['main-form']}>
            <h1 className={addClasses['form-title']}>Add Exercise</h1>
            
            {/* NAME */}
            <label htmlFor="exercise-name" className={addClasses['text-label']}>Name:</label>
            <input type="text" id="exercise-name" name="name"
                placeholder='Enter the exercise name...' className={addClasses['select-input']}/>
            
            {/* ALTERNATIVE NAME */}
            <label htmlFor="exercise-alternativeName" className={addClasses['text-label']}>Alternative name:</label>
            <input type="text" id="exercise-alternativeName" name="alternativeName"
                placeholder='Enter an alternative name...'className={addClasses['select-input']} />
            
            {/* DIFFICULTY */}
            <label htmlFor="exercise-difficulty" className={addClasses['text-label']}>Difficulty:</label>
            <SelectInput select={difficultyInfo.select}/>
            
            {/* COMPOUND MOVEMENT */}
            <label htmlFor="exercise-compoundMovement" className={addClasses['text-label']}>Compound movement:</label>
            <SelectInput select={compoundMovementInfo.select}/>
            
            {/* MAIN MUSCLE */}
            <label htmlFor="exercise-mainMuscle" className={addClasses['text-label']}>Main muscle:</label>
            { muscles && muscles.length 
                ? <SelectInput select={mainMuscleInfo.select}/>
                : <img src="/loading.gif" alt="Loading..." className={addClasses['loading-img']}/>}

            {/* SECONDARY MUSCLES */}
            <label htmlFor="exercise-secondaryMuscles" className={addClasses['text-label']}>Secondary muscles:</label>
            { muscles && muscles.length 
                ? <IncrementalSelect info={secondaryMusclesInfo}/>
                : <img src="/loading.gif" alt="Loading..." className={addClasses['loading-img']}/>}
            
            {/* TYPES */}
            <label htmlFor="exercise-types" className={addClasses['text-label']}>Types:</label>
            <IncrementalSelect info={typesInfo}/>

            {/* EQUIPMENTS */}
            <label htmlFor="exercise-equipments" className={addClasses['text-label']}>Equipments:</label>
            { equipments && equipments.length 
                ? <IncrementalSelect info={equipmentsInfo}/>
                : <img src="/loading.gif" alt="Loading..." className={addClasses['loading-img']}/>}

            {/* IMAGE */}
            <label htmlFor="exercise-image" className={addClasses['text-label']}>Image:</label>
            <input type="text" id="exercise-image" name="linkToImage"
                placeholder='Enter the link for the image...' className={addClasses['select-input']}/>

            {/* VIDEO */}
            <label htmlFor="exercise-video" className={addClasses['text-label']}>Video:</label>
            <input type="text" id="exercise-video" name="linkToVideo"
                placeholder='Enter the link for the video...' className={addClasses['select-input']}/>

            {/* SUBMIT BUTTON */}
            <button type="submit" id="add-exercse-btn" className={addClasses['submit-btn']}>Add exercise</button>
        </form>
    </section>
};

export default AddExercise;