import IncrementalSelect from '../../General/Selects/IncrementalSelect';
import SelectInput from '../../General/Selects/SelectInput';
import addClasses from '../../General/CSS/AddInfo.module.css';
import { postMuscle } from '../../../../util/apis/muscles/musclesApis';

const AddMuscle = props => {
    /** Fields Data */
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

    const exercises = [
        // TODO: Pull values from backend
        {value: "", label:"-- Choose an exercise --"},
        {value: "Squats", label:"Squats"},
        {value: "Deadlifts", label:"Deadlifts"},
    ];

    const exercisesInfo = {
        select: {
            id: "muscle-exercises",
            name: "exercises",
            options: exercises
        },
        button: {
            id: "add-exercise-btn",
            label: "Add exercise"
        }
    };

    /** Functions */
    const addMuscle = (event) => {
        event.preventDefault();
        const formVals = getValuesFromForm(event.target.elements);
        console.log("value: ", formVals);
        // postMuscle(formVals).then(data => { 
        //     console.log("Response data: ", data);
        // });
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
        return values;
    };

    /** Render */
    return <section className={addClasses['main-section']}>
        <form id="add-muscle-form"  onSubmit={addMuscle} className={addClasses['main-form']}>
            <h1 className={addClasses['form-title']}>Add Muscle</h1>
            
            {/* NAME */}
            <label htmlFor="muscle-name" className={addClasses['text-label']}>Name:</label>
            <input type="text" id="muscle-name" name="name"
                placeholder='Enter the muscle name...' className={addClasses['text-input']}/>
            
            {/* ALTERNATIVE NAME */}
            <label htmlFor="muscle-alternativeName" className={addClasses['text-label']}>Alternative name:</label>
            <input type="text" id="muscle-alternativeName" name="alternativeName"
                placeholder='Enter an alternative name...'className={addClasses['text-input']} />
            
            {/* TYPE */}
            <label htmlFor="muscle-type" className={addClasses['text-label']}>Type:</label>
            <SelectInput select={typesInfo.select}/>

            {/* EXERCISES */}
            <label htmlFor="muscle-exercises" className={addClasses['text-label']}>Exercises:</label>
            <IncrementalSelect info={exercisesInfo}/>
        
            {/* IMAGE */}
            <label htmlFor="muscle-image" className={addClasses['text-label']}>Image:</label>
            <input type="text" id="muscle-image" name="linkToImage"
                placeholder='Enter the link for the image...' className={addClasses['text-input']}/>

            {/* SUBMIT BUTTON */}
            <button type="submit" id="add-exercse-btn" className={addClasses['submit-btn']}>Add muscle</button>
        </form>
    </section>
};

export default AddMuscle;