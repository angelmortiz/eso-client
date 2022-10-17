import healthClasses from '../../HealthContent.module.css';

const Exercise = props => {
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
            <select id="exercise-difficulty" name="exerciseDifficulty" className={healthClasses['text-input']}>
                <option value="">-- Choose difficulty --</option>
                <option value="easy">Easy</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
            
            {/* COMPOUND EXERCISE */}
            <label for="exercise-compoundExercise" className={healthClasses['text-label']}>Compound exercise:</label>
            <select id="exercise-compoundExercise" name="exerciseCompoundExercise" className={healthClasses['text-input']}>
                <option value="">-- Choose option --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            
            {/* MAIN MUSCLE */}
            <label for="exercise-mainMuscle" className={healthClasses['text-label']}>Main muscle:</label>
            <select id="exercise-mainMuscle" name="exerciseMainMuscle" className={healthClasses['text-input']}>
                <option value="">-- Choose a muscle --</option>
                <option value="quads">Quads</option>
                <option value="hamstrings">Hamstrings</option>
            </select>

            {/* SECONDARY MUSCLES */}
            <label for="exercise-secondaryMuscles" className={healthClasses['text-label']}>Secondary muscles:</label>
            <select id="exercise-secondaryMuscles" name="exerciseSecondaryMuscles" className={healthClasses['text-input']}>
                <option value="">-- Choose a muscle --</option>
                <option value="quads">Quads</option>
                <option value="hamstrings">Hamstrings</option>
            </select>
                {/* ADD BUTTON */}
            <button id="add-muscle-btn" className={healthClasses['add-btn']}>Add muscle</button>
            
            {/* TYPES */}
            <label for="exercise-types" className={healthClasses['text-label']}>Types:</label>
            <select id="exercise-types" name="exercisetypes" className={healthClasses['text-input']}>
                <option value="">-- Choose a type --</option>
                <option value="hiit">HIIT</option>
                <option value="strength">Strength</option>
            </select>
                {/* ADD BUTTON */}
            <button id="add-type-btn" className={healthClasses['add-btn']}>Add type</button>

            {/* EQUIPMENTS */}
            <label for="exercise-equipments" className={healthClasses['text-label']}>Equipments:</label>
            <select id="exercise-equipments" name="exerciseEquipments" className={healthClasses['text-input']}>
                <option value="">-- Choose an equipment --</option>
                <option value="hiit">HIIT</option>
                <option value="strength">Strength</option>
            </select>
                {/* ADD BUTTON */}
            <button id="add-equipment-btn" className={healthClasses['add-btn']}>Add Equipment</button>

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