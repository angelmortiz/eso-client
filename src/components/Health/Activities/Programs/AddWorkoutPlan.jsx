import FormSelectInput from "../../../UI/Selects/FormSelectInput";

const AddWorkoutPlan = (props) => {
  const { workouts, title, selectedPlan } = props;

  return (
    <div className="my-8">
      <FormSelectInput
        select={workouts.select}
        label={title}
        selectedValue={selectedPlan?.workout?._id || ""}
      />
    </div>
  );
};

export default AddWorkoutPlan;
