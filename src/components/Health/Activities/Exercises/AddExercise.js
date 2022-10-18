import IncrementalSelect from '../../General/Selects/IncrementalSelect';
import SelectInput from '../../General/Selects/SelectInput';
import addClasses from '../../General/CSS/AddInfo.module.css';


const Exercise = props => {
    /** Fields Data */
    const difficultyInfo = {
        select: {
            id: "exercise-difficulty",
            name: "exerciseDifficulty",
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
            name: "exerciseCompoundExercise",
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

    const primaryMuscleInfo = {
        select: {
            id: "exercise-secondaryMuscle",
            name: "exerciseSecondaryMuscles",
            options: muscles
        }
    };

    const secondaryMuscleInfo = {
        select: {
            id: "exercise-secondaryMuscle",
            name: "exerciseSecondaryMuscles",
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
            name: "exerciseTypes",
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
            name: "exerciseEquipments",
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

    /** Render */
    return <section className={addClasses['main-section']}>
        <form className={addClasses['main-form']}>
            <h1 className={addClasses['form-title']}>Add Exercise</h1>
            
            {/* NAME */}
            <label for="exercise-name" className={addClasses['text-label']}>Name:</label>
            <input type="text" id="exercise-name" name="exerciseName"
                placeholder='Enter the exercise name...' className={addClasses['text-input']}/>
            
            {/* ALTERNATIVE NAME */}
            <label for="exercise-alternativeName" className={addClasses['text-label']}>Alternative name:</label>
            <input type="text" id="exercise-alternativeName" name="exerciseAlternativeName"
                placeholder='Enter an alternative name...'className={addClasses['text-input']} />
            
            {/* DIFFICULTY */}
            <label for="exercise-difficulty" className={addClasses['text-label']}>Difficulty:</label>
            <SelectInput select={difficultyInfo.select}/>
            
            {/* COMPOUND EXERCISE */}
            <label for="exercise-compoundExercise" className={addClasses['text-label']}>Compound exercise:</label>
            <SelectInput select={compoundExerciseInfo.select}/>
            
            {/* MAIN MUSCLE */}
            <label for="exercise-mainMuscle" className={addClasses['text-label']}>Main muscle:</label>
            <SelectInput select={primaryMuscleInfo.select}/>

            {/* SECONDARY MUSCLES */}
            <label for="exercise-secondaryMuscles" className={addClasses['text-label']}>Secondary muscles:</label>
            <IncrementalSelect info={secondaryMuscleInfo}/>

            {/* TYPES */}
            <label for="exercise-types" className={addClasses['text-label']}>Types:</label>
            <IncrementalSelect info={typesInfo}/>

            {/* EQUIPMENTS */}
            <label for="exercise-equipments" className={addClasses['text-label']}>Equipments:</label>
            <IncrementalSelect info={equipmentsInfo}/>

            {/* IMAGE */}
            <label for="exercise-image" className={addClasses['text-label']}>Image:</label>
            <input type="text" id="exercise-image" name="exerciseImage"
                placeholder='Enter the link for the image...' className={addClasses['text-input']}/>

            {/* VIDEO */}
            <label for="exercise-video" className={addClasses['text-label']}>Video:</label>
            <input type="text" id="exercise-video" name="exerciseVideo"
                placeholder='Enter the link for the video...' className={addClasses['text-input']}/>

            {/* SUBMIT BUTTON */}
            <button type="submit" className={addClasses['submit-btn']}>Add exercise</button>
        </form>
    </section>
};

export default Exercise;