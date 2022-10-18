import classes from './DetailsInfo.module.css';

const DetailsInfo = props => {
    return <section className={classes['main-section']}>
        {/* NAME */}
        <h1 className={classes['name']}>Squats</h1>
        {/* ALTERNATIVE NAME */}
        <h2 className={classes['alternative-name']}>(Sentadillas)</h2>
        {/* IMAGE */}
        <img src="/squat.jpg" alt="Squat" className={classes['img']}/>
        {/* VIDEO */}
        <text><strong>&#60;Placeholder for video&#62;</strong></text>
        <div className={classes['general-info']}>
            {/* DIFFICULTY */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Difficulty: </text>
                <text className={classes['value']}>Advanced</text>
            </div>
            {/* COMPOUND EXERCISE */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Compound exercise: </text>
                <text className={classes['value']}>Yes</text>
            </div>
            {/* MAIN MUSCLE */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Main muscle: </text>
                <text className={classes['value']}>Quadriceps</text>
            </div>
            {/* SECONDARY MUSCLES */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Secondary muscles: </text>
                <text className={classes['value']}>Glutes</text>
            </div>
            {/* TYPES */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Type: </text>
                <text className={classes['value']}>Strength</text>
            </div>
            {/* EQUIPMENTS */}
            <div className={classes['info-block']}>
                <text className={classes['label']}>Equipments: </text>
                <text className={classes['value']}>Barbell</text>
            </div>
        </div>
    </section>
    
};

export default DetailsInfo;