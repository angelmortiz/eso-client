import IncrementalSelect from '../../General/Selects/IncrementalSelect';
import SelectInput from '../../General/Selects/SelectInput';
import addClasses from '../../General/CSS/AddInfo.module.css';


const Exercise = props => {
    /** Fields Data */
    const difficultyInfo = {
        select: {
            id: "exercise-difficulty",
            name: "difficulty",
            options: [
                {value: "", label:"-- Choose difficulty --"},
                {value: "easy", label:"Easy"},
                {value: "intermediate", label:"Intermediate"},
                {value: "advanced", label:"Advanced"},
            ]
        }
    }

    const compoundExerciseInfo = {
        select: {
            id: "exercise-compoundExercise",
            name: "compoundExercise",
            options: [
                {value: "", label:"-- Choose option --"},
                {value: "yes", label:"Yes"},
                {value: "no", label:"No"}
            ]
        }
    }

    const muscles = [
        // TODO: Pull values from backend
        {value: "", label:"-- Choose a muscle --"},
        {value: "quads", label:"Quads"},
        {value: "hamstrings", label:"Hamstrings"},
    ];

    const mainMuscleInfo = {
        select: {
            id: "exercise-mainMuscle",
            name: "mainMuscle",
            options: muscles
        }
    };

    const secondaryMuscleInfo = {
        select: {
            id: "exercise-secondaryMuscle",
            name: "secondaryMuscles",
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
                // TODO: Pull values from backend
                {value: "", label:"-- Choose a type --"},
                {value: "hiit", label:"HIIT"},
                {value: "strength", label:"Strength"},
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
            options: [
                // TODO: Pull values from backend
                {value: "", label:"-- Choose an equipment --"},
                {value: "dumbbells", label:"Dumbbells"},
                {value: "barbell", label:"Barbell"},
            ]
        },
        button: {
            id: "add-equipment-btn",
            label: "Add equipment"
        }
    };

    /** Functions */
    const addExercise = (event) => {
        event.preventDefault();
        const formVals = getValuesFromForm(event.target.elements);
        console.log("value: ", formVals);
    };

    const getValuesFromForm = (elements) => {
        const values = {};

        values.name = elements.name.value;
        values.alternativeName = elements.alternativeName.value;
        values.difficulty = elements.difficulty.value;
        values.compoundExercise = elements.compoundExercise.value;
        values.mainMuscle = elements.mainMuscle.value;
        values.linkToImage = elements.linkToImage.value;
        values.linkToVideo = elements.linkToVideo.value;

        //multi-select options
        values.secondaryMuscle = extractMultiOptionValues(elements.secondaryMuscles);
        values.types = extractMultiOptionValues(elements.types);
        values.equipment = extractMultiOptionValues(elements.equipments);

        return values;
    };

    const extractMultiOptionValues = (elements) => {
        //if there is only one select dropdown, it adds the HTMLSelectElement to an array before extracting the value.
        //if there are multiple select dropdowns, converts the RadioNodeList into an array (to later use .map()).
        elements = Object.prototype.toString.call(elements).includes('HTMLSelectElement') ?
            [elements] : [...elements];
        
        let values = elements.map(element => { return element.value; });
        values = values.filter(v => v); //removes empty selections
        return values;
    };

    /** Render */
    return <section className={addClasses['main-section']}>
        <form id="add-exercise-form"  onSubmit={addExercise} className={addClasses['main-form']}>
            <h1 className={addClasses['form-title']}>Add Exercise</h1>
            
            {/* NAME */}
            <label htmlFor="exercise-name" className={addClasses['text-label']}>Name:</label>
            <input type="text" id="exercise-name" name="name"
                placeholder='Enter the exercise name...' className={addClasses['text-input']}/>
            
            {/* ALTERNATIVE NAME */}
            <label htmlFor="exercise-alternativeName" className={addClasses['text-label']}>Alternative name:</label>
            <input type="text" id="exercise-alternativeName" name="alternativeName"
                placeholder='Enter an alternative name...'className={addClasses['text-input']} />
            
            {/* DIFFICULTY */}
            <label htmlFor="exercise-difficulty" className={addClasses['text-label']}>Difficulty:</label>
            <SelectInput select={difficultyInfo.select}/>
            
            {/* COMPOUND EXERCISE */}
            <label htmlFor="exercise-compoundExercise" className={addClasses['text-label']}>Compound exercise:</label>
            <SelectInput select={compoundExerciseInfo.select}/>
            
            {/* MAIN MUSCLE */}
            <label htmlFor="exercise-mainMuscle" className={addClasses['text-label']}>Main muscle:</label>
            <SelectInput select={mainMuscleInfo.select}/>

            {/* SECONDARY MUSCLES */}
            <label htmlFor="exercise-secondaryMuscles" className={addClasses['text-label']}>Secondary muscles:</label>
            <IncrementalSelect info={secondaryMuscleInfo}/>

            {/* TYPES */}
            <label htmlFor="exercise-types" className={addClasses['text-label']}>Types:</label>
            <IncrementalSelect info={typesInfo}/>

            {/* EQUIPMENTS */}
            <label htmlFor="exercise-equipments" className={addClasses['text-label']}>Equipments:</label>
            <IncrementalSelect info={equipmentsInfo}/>

            {/* IMAGE */}
            <label htmlFor="exercise-image" className={addClasses['text-label']}>Image:</label>
            <input type="text" id="exercise-image" name="linkToImage"
                placeholder='Enter the link for the image...' className={addClasses['text-input']}/>

            {/* VIDEO */}
            <label htmlFor="exercise-video" className={addClasses['text-label']}>Video:</label>
            <input type="text" id="exercise-video" name="linkToVideo"
                placeholder='Enter the link for the video...' className={addClasses['text-input']}/>

            {/* SUBMIT BUTTON */}
            <button type="submit" id="add-exercse-btn" className={addClasses['submit-btn']}>Add exercise</button>
        </form>
    </section>
};

export default Exercise;