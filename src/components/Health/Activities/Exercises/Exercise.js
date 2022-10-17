import healthClasses from '../../HealthContent.module.css';

const Exercise = props => {
    return <section className={healthClasses['main-section']}>
        <form className={healthClasses['main-form']}>
            {/* EXERCISE NAME */}
            <label for="exercise-name" className={healthClasses['text-label']}>Exercise name:</label>
            <input type="text" id="exercise-name" name="exerciseName"
                placeholder='Enter exercise name...' className={healthClasses['text-input']}/>
            {/* EXERCISE DESCRIPTION */}
            <label for="exercise-description" className={healthClasses['text-label']}>Exercise description:</label>
            <input type="text" id="exercise-description" name="exerciseDescription"
                placeholder='Enter exercise description...'className={healthClasses['text-input']} />
            
            {/* SUBMIT BUTTON */}
            <button type="submit" className={healthClasses['submit-btn']}>Add exercise</button>
        </form>
    </section>
};

export default Exercise;