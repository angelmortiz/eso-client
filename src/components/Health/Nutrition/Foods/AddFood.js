import healthClasses from '../../HealthContent.module.css';

const Food = props => {
    return <section className={healthClasses['main-section']}>
        <form className={healthClasses['main-form']}>
            {/* FOOD NAME */}
            <label for="food-name" className={healthClasses['text-label']}>Food name:</label>
            <input type="text" id="food-name" name="foodName"
                placeholder='Enter food name...' className={healthClasses['text-input']}/>
            {/* FOOD DESCRIPTION */}
            <label for="food-description" className={healthClasses['text-label']}>Food description:</label>
            <input type="text" id="food-description" name="foodDescription"
                placeholder='Enter food description...'className={healthClasses['text-input']} />
            
            {/* SUBMIT BUTTON */}
            <button type="submit" className={healthClasses['submit-btn']}>Add food</button>
        </form>
    </section>
};

export default Food;