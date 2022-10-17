import IncrementalSelect from '../../General/IncrementalSelect';
import SelectInput from '../../General/SelectInput';
import healthClasses from '../../HealthContent.module.css';


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
    return <section className={healthClasses['main-section']}>
        <form className={healthClasses['main-form']}>
            {/* NAME */}
            <label for="exercise-name" className={healthClasses['text-label']}>Name:</label>
            <input type="text" id="exercise-name" name="exerciseName"
                placeholder='Enter the exercise name...' className={healthClasses['text-input']}/>
            
            {/* ALTERNATIVE NAME */}
            <label for="exercise-alternativeName" className={healthClasses['text-label']}>Alternative name:</label>
            <input type="text" id="exercise-alternativeName" name="exerciseAlternativeName"
                placeholder='Enter an alternative name...'className={healthClasses['text-input']} />
            
            {/* DIFFICULTY */}
            <label for="exercise-difficulty" className={healthClasses['text-label']}>Difficulty:</label>
            <SelectInput select={difficultyInfo.select}/>
            
            {/* COMPOUND EXERCISE */}
            <label for="exercise-compoundExercise" className={healthClasses['text-label']}>Compound exercise:</label>
            <SelectInput select={compoundExerciseInfo.select}/>
            
            {/* MAIN MUSCLE */}
            <label for="exercise-mainMuscle" className={healthClasses['text-label']}>Main muscle:</label>
            <SelectInput select={primaryMuscleInfo.select}/>

            {/* SECONDARY MUSCLES */}
            <label for="exercise-secondaryMuscles" className={healthClasses['text-label']}>Secondary muscles:</label>
            <IncrementalSelect info={secondaryMuscleInfo}/>

            {/* TYPES */}
            <label for="exercise-types" className={healthClasses['text-label']}>Types:</label>
            <IncrementalSelect info={typesInfo}/>

            {/* EQUIPMENTS */}
            <label for="exercise-equipments" className={healthClasses['text-label']}>Equipments:</label>
            <IncrementalSelect info={equipmentsInfo}/>

            {/* IMAGE */}
            <label for="exercise-image" className={healthClasses['text-label']}>Image:</label>
            <input type="text" id="exercise-image" name="exerciseImage"
                placeholder='Enter the link for the image...' className={healthClasses['text-input']}/>

            {/* VIDEO */}
            <label for="exercise-video" className={healthClasses['text-label']}>Video:</label>
            <input type="text" id="exercise-video" name="exerciseVideo"
                placeholder='Enter the link for the video...' className={healthClasses['text-input']}/>

            {/* SUBMIT BUTTON */}
            <button type="submit" className={healthClasses['submit-btn']}>Add exercise</button>
        </form>
    </section>
};

export default Exercise;