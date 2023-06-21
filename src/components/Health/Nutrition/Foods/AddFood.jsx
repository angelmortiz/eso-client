import styles from '../../../UI/General/CSS/Form.module.css';

const Food = props => {
    return <section className={styles['main-section']}>
        <form className={styles['main-form']}>
            <h1 className={styles['form-title']}>Add Food</h1>
            {/* FOOD NAME */}
            <label htmlFor="food-name" className={styles['text-label']}>Food name:</label>
            <input type="text" id="food-name" name="foodName"
                placeholder='Enter food name...' className={styles['select-input']}/>
            {/* FOOD DESCRIPTION */}
            <label htmlFor="food-description" className={styles['text-label']}>Food description:</label>
            <input type="text" id="food-description" name="foodDescription"
                placeholder='Enter food description...'className={styles['select-input']} />
            
            {/* SUBMIT BUTTON */}
            <button type="submit" className={styles['submit-btn']}>Add food</button>
        </form>
    </section>
};

export default Food;