import styles from '../../../UI/General/CSS/Form.module.css';
import SelectInput from '../../../UI/Selects/SelectInput';

const AddWorkoutPlan = (props) => {
  const { workouts, title, selectedPlan } = props;

  return (
    <div className={styles['plan-div']}>
      <h3 className={styles['plan-title']}>{title}</h3>

      {/* WORKOUT */}
      <label htmlFor="workoutPlanWorkout" className={styles['text-label']}>
        Workout:
      </label>
      <SelectInput
        select={workouts.select}
        value="_id"
        label="value"
        selectedValue={selectedPlan?.workout?._id}
      />
    </div>
  );
};

export default AddWorkoutPlan;
