import classes from './HealthContent.module.css';

const HealthContent = props => {
    return <section className={classes['main-section']}>
        <form className={classes['main-form']}>
            {/* FOOD NAME */}
            <label for="food-name" className={classes['text-label']}>Food name:</label>
            <input type="text" id="food-name" name="foodName"
                placeholder='Enter food name...' className={classes['text-input']}/>
            {/* FOOD DESCRIPTION */}
            <label for="food-description" className={classes['text-label']}>Food description:</label>
            <input type="text" id="food-description" name="foodDescription"
                placeholder='Enter food description...'className={classes['text-input']} />
            
            {/* SUBMIT BUTTON */}
            <button type="submit" className={classes['submit-btn']}>Add food</button>
        </form>
    </section>
};

export default HealthContent;