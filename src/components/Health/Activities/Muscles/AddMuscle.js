import IncrementalSelect from '../../../UI/Selects/IncrementalSelect';
import SelectInput from '../../../UI/Selects/SelectInput';
import addClasses from '../../../UI/General/CSS/Form.module.css';
import { fetchAllExerciseNames } from '../../../../util/apis/activities/exercises/exercisesApis';
import { useEffect, useState} from 'react';
import { postMuscle } from '../../../../util/apis/activities/muscles/musclesApis';
import { useNavigate } from 'react-router-dom';

const AddMuscle = props => {
    const navigateTo = useNavigate();
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetchAllExerciseNames().then(response => { 
            if (!response || !response.isSuccess) return;
            //adds an empty default option
            response.body.unshift({_id: "", name: "-- Choose an exercise --"});
            setExercises(response.body);
        });
    }, []);

    const exercisesInfo = {
        select: {
            id: "muscle-exercises",
            name: "exercises",
            value: "_id",
            label: "name",
            options: exercises
        },
        button: {
            id: "add-exercise-btn",
            label: "Add exercise"
        }
    };

    const typesInfo = {
        select: {
            id: "muscles-type",
            name: "type",
            options: [
                {value: "", label:"-- Choose a type --"},
                {value: "Big", label:"Big"},
                {value: "Small", label:"Small"},
            ]
        }
    };

    /** Functions */
    const addMuscle = (event) => {
        event.preventDefault();
        const formVals = getValuesFromForm(event.target.elements);

        postMuscle(formVals).then(response => { 
            console.log("response: ", response);
            if (!response || !response.isSuccess) return;
            navigateTo('/activities/muscles')
        });
    };

    const getValuesFromForm = (elements) => {
        const values = {};
        values.name = elements.name.value;
        values.alternativeName = elements.alternativeName.value;
        values.type = elements.type.value;
        values.linkToImage = elements.linkToImage.value;

        //multi-select options
        values.exercises = extractMultiOptionValues(elements.exercises);
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
        //maps values to objects of ids and names (required for backend)
        values = values.map(id => {
            const name = exercises.find(exercise => exercise._id === id)?.name;
            return {exerciseId: id, exerciseName: name};
        });
        return values;
    };

    /** Render */
    return <section className={addClasses['main-section']}>
        <form id="add-muscle-form"  onSubmit={addMuscle} className={addClasses['main-form']}>
            <h1 className={addClasses['form-title']}>Add Muscle</h1>
            
            {/* NAME */}
            <label htmlFor="muscle-name" className={addClasses['text-label']}>Name:</label>
            <input type="text" id="muscle-name" name="name"
                placeholder='Enter the muscle name...' className={addClasses['select-input']}/>
            
            {/* ALTERNATIVE NAME */}
            <label htmlFor="muscle-alternativeName" className={addClasses['text-label']}>Alternative name:</label>
            <input type="text" id="muscle-alternativeName" name="alternativeName"
                placeholder='Enter an alternative name...'className={addClasses['select-input']} />
            
            {/* TYPE */}
            <label htmlFor="muscle-type" className={addClasses['text-label']}>Type:</label>
            <SelectInput select={typesInfo.select}/>

            {/* EXERCISES */}
            <label htmlFor="muscle-exercises" className={addClasses['text-label']}>Exercises:</label>
            { exercises && exercises.length 
                ? <IncrementalSelect info={exercisesInfo} />
                : <img src="/loading.gif" alt="Loading..." className={addClasses['loading-img']}/>}
        
            {/* IMAGE */}
            <label htmlFor="muscle-image" className={addClasses['text-label']}>Image:</label>
            <input type="text" id="muscle-image" name="linkToImage"
                placeholder='Enter the link for the image...' className={addClasses['select-input']}/>

            {/* SUBMIT BUTTON */}
            <button type="submit" id="add-exercse-btn" className={addClasses['submit-btn']}>Add muscle</button>
        </form>
    </section>
};

export default AddMuscle;