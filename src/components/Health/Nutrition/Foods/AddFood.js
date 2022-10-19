import addClasses from '../../General/CSS/AddInfo.module.css';

const Food = props => {
    return <section className={addClasses['main-section']}>
        <form className={addClasses['main-form']}>
            <h1 className={addClasses['form-title']}>Add Food</h1>
            {/* FOOD NAME */}
            <label htmlFor="food-name" className={addClasses['text-label']}>Food name:</label>
            <input type="text" id="food-name" name="foodName"
                placeholder='Enter food name...' className={addClasses['text-input']}/>
            {/* FOOD DESCRIPTION */}
            <label htmlFor="food-description" className={addClasses['text-label']}>Food description:</label>
            <input type="text" id="food-description" name="foodDescription"
                placeholder='Enter food description...'className={addClasses['text-input']} />
            
            {/* SUBMIT BUTTON */}
            <button type="submit" className={addClasses['submit-btn']}>Add food</button>
        </form>
    </section>
};

export default Food;