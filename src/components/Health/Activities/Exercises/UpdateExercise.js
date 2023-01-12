import IncrementalSelect from '../../General/Selects/IncrementalSelect';
import SelectInput from '../../General/Selects/SelectInput';
import addClasses from '../../General/CSS/Form.module.css';
import { putExercise } from '../../../../util/apis/exercises/exercisesApis';
import { useEffect, useState} from 'react';
import { fetchAllEquipmentNames } from '../../../../util/apis/equipments/equipmentsApis';
import { fetchAllMuscleNames } from '../../../../util/apis/muscles/musclesApis';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchExerciseById } from "../../../../util/apis/exercises/exercisesApis"

const UpdateExercise = props => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);
    const [musclesOptions, setMuscles] = useState([]);
    const [equipmentsOptions, setEquipmentsOptions] = useState([]);

    /** INPUT VALUES */
    const [name, setName] = useState("");
    const [alternativeName, setAlternativeName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [compoundMovement, setCompoundMovement] = useState("");
    const [mainMuscle, setMainMuscle] = useState("");
    const [secondaryMuscles, setSecondaryMuscles] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [types, setTypes] = useState([]);
    const [linkToImage, setLinkToImage] = useState("");
    const [linkToVideo, setLinkToVideo] = useState("");
    /** */
    
    //Gets the most updated info from current exercise
    useEffect(() => {
        if (!id) console.log(`Error: exercise id not found in the url.`);
        fetchExerciseById(id).then(response => { 
            if (!response || !response.isSuccess) return;
            setExercise(response.body);
        });
    }, [id]);

    //Sets input values based on the current info fetched from the db
    useEffect(() => {
        if (!exercise) return;
        setName(exercise.name);
        setAlternativeName(exercise.alternativeName);
        setDifficulty(exercise.difficulty);
        setCompoundMovement(exercise.compoundMovement ? "yes": "no");
        setMainMuscle(exercise.mainMuscle?.muscleId);
        setSecondaryMuscles(extractSelectedValues(exercise.secondaryMuscles, "muscleId"));
        setEquipments(extractSelectedValues(exercise.equipments, "equipmentId"));
        setTypes(exercise.types);
        setLinkToImage(exercise.linkToImage);
        setLinkToVideo(exercise.linkToVideo);
    }, [exercise]);


    const extractSelectedValues = (arrObjs, propertyName) => {
        return arrObjs.map(obj => obj[propertyName]);
    }

    //Fetches options for muscles and equipments
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
            setEquipmentsOptions(response.body);
        });
    }, []);

    /** FUNCTIONS */
    //runs when update button is clicked
    const UpdateExercise = (event) => {
        event.preventDefault();
        const formVals = getValuesFromForm(event.target.elements);
        
        putExercise(id, formVals).then(response => { 
            console.log("Response: ", response);
            if (response && response.isSuccess) {
                //Navigate to the just updated exercise id
                navigate(`/activities/exercise/${id}`);
            }
        });
    };

    const getValuesFromForm = (elements) => {
        const values = {};
        values.id = id;
        values.name = elements.name.value;
        values.alternativeName = elements.alternativeName.value;
        values.difficulty = elements.difficulty.value;
        values.compoundMovement = elements.compoundMovement.value === 'yes';
        values.linkToImage = elements.linkToImage.value;
        values.linkToVideo = elements.linkToVideo.value;
        values.mainMuscle = elements.mainMuscle.value;
        
        //extract values from multi-select options
        values.secondaryMuscles = extractMultiOptionValues(elements.secondaryMuscles);
        values.types = extractMultiOptionValues(elements.types);
        values.equipments = extractMultiOptionValues(elements.equipments);

        //maps the id of each selection to its name (required for the db schema)
        values.mainMuscle = values.mainMuscle 
            ? mapIdsToNames([values.mainMuscle], musclesOptions, "muscleId", "muscleName")[0] 
            : {};
        values.secondaryMuscles = mapIdsToNames(values.secondaryMuscles, musclesOptions, "muscleId", "muscleName");
        values.equipments = mapIdsToNames(values.equipments, equipmentsOptions, "equipmentId", "equipmentName");

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
            options: musclesOptions
        }
    };

    const secondaryMusclesInfo = {
        select: {
            id: "exercise-secondaryMuscle",
            name: "secondaryMuscles",
            value: "_id",
            label: "name",
            options: musclesOptions
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
                // TODO: Pull values from backend
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
            options: equipmentsOptions
        },
        button: {
            id: "add-equipment-btn",
            label: "Add equipment"
        }
    };
    /** [END] FIELDS DATA */

    /** Render */
    return <section className={addClasses['main-section']}>
        <form id="add-exercise-form"  onSubmit={UpdateExercise} className={addClasses['main-form']}>
            <h1 className={addClasses['form-title']}>Update Exercise</h1>
            
            <div className={addClasses["form-content"]}>
                {/* NAME */}
                <div className={addClasses['form-input']}>
                    <label htmlFor="exercise-name" className={addClasses['text-label']}>Name:</label>
                    <input type="text" id="exercise-name" name="name"
                        placeholder='Enter the exercise name...' className={addClasses['select-input']}
                        value={name}
                        onChange={event => setName(event.target.value)}/>
                </div>
                
                {/* ALTERNATIVE NAME */}
                <div className={addClasses['form-input']}>
                    <label htmlFor="exercise-alternativeName" className={addClasses['text-label']}>Alternative name:</label>
                    <input type="text" id="exercise-alternativeName" name="alternativeName"
                        placeholder='Enter an alternative name...'className={addClasses['select-input']}
                        value={alternativeName}
                        onChange={event => setAlternativeName(event.target.value)}/>
                </div>
                    
                {/* DIFFICULTY */}
                <div className={addClasses['form-input']}>
                    <label htmlFor="exercise-difficulty" className={addClasses['text-label']}>Difficulty:</label>
                    <SelectInput select={difficultyInfo.select} selectedValue={difficulty}/>
                </div>

                {/* COMPOUND MOVEMENT */}
                <div className={addClasses['form-input']}>
                    <label htmlFor="exercise-compoundMovement" className={addClasses['text-label']}>Compound movement:</label>
                    <SelectInput select={compoundMovementInfo.select} selectedValue={compoundMovement}/>
                </div>

                {/* MAIN MUSCLE */}
                <div className={addClasses['form-input']}>
                    <label htmlFor="exercise-mainMuscle" className={addClasses['text-label']}>Main muscle:</label>
                    { musclesOptions && musclesOptions.length 
                        ? <SelectInput select={mainMuscleInfo.select} selectedValue={mainMuscle}/>
                        : <img src="/loading.gif" alt="Loading..." className={addClasses['loading-img']}/>}
                </div>

                {/* SECONDARY MUSCLES */}
                <div className={addClasses['form-input']}>
                    <label htmlFor="exercise-secondaryMuscles" className={addClasses['text-label']}>Secondary muscles:</label>
                    { musclesOptions && musclesOptions.length 
                        ? <IncrementalSelect info={secondaryMusclesInfo} selectedValues={secondaryMuscles}/>
                        : <img src="/loading.gif" alt="Loading..." className={addClasses['loading-img']}/>}
                </div>

                {/* TYPES */}
                <div className={addClasses['form-input']}>
                    <label htmlFor="exercise-types" className={addClasses['text-label']}>Types:</label>
                    <IncrementalSelect info={typesInfo} selectedValues={types}/>
                </div>

                {/* EQUIPMENTS */}
                <div className={addClasses['form-input']}>
                    <label htmlFor="exercise-equipments" className={addClasses['text-label']}>Equipments:</label>
                    { equipmentsOptions && equipmentsOptions.length 
                        ? <IncrementalSelect info={equipmentsInfo} selectedValues={equipments}/>
                        : <img src="/loading.gif" alt="Loading..." className={addClasses['loading-img']}/>}
                </div>

                {/* IMAGE */}
                <div className={addClasses['form-input']}>
                    <label htmlFor="exercise-image" className={addClasses['text-label']}>Image:</label>
                    <input type="text" id="exercise-image" name="linkToImage"
                        placeholder='Enter the link for the image...' className={addClasses['select-input']}
                        value={linkToImage}
                        onChange={event => setLinkToImage(event.target.value)}/>
                </div>

                {/* VIDEO */}
                <div className={addClasses['form-input']}>
                    <label htmlFor="exercise-video" className={addClasses['text-label']}>Video:</label>
                    <input type="text" id="exercise-video" name="linkToVideo"
                        placeholder='Enter the link for the video...' className={addClasses['select-input']}
                        value={linkToVideo}
                        onChange={event => setLinkToVideo(event.target.value)}/>
                </div>
            </div>
            {/* SUBMIT BUTTON */}
            <button type="submit" id="add-exercse-btn" className={addClasses['submit-btn']}>Update exercise</button>
        </form>
    </section>
};

export default UpdateExercise;