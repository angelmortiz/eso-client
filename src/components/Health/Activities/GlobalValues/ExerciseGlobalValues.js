export const ExerciseDifficulty = {
  select: {
    id: "exercise-difficulty",
    name: "difficulty",
    options: [
      { value: "", label: "Choose a difficulty", disabled: true },
      { value: "Easy", label: "Easy" },
      { value: "Intermediate", label: "Intermediate" },
      { value: "Advanced", label: "Advanced" },
    ],
  },
};

export const ExerciseCompoundMovement = {
  select: {
    id: "exercise-compoundMovement",
    name: "compoundMovement",
    options: [
      { value: "", label: "Choose an option", disabled: true },
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
};

export const ExerciseTypes = {
  label: {
    label: "Type",
  },
  select: {
    id: "exercise-types",
    name: "types",
    options: [
      // TODO: Pull values from backend
      { value: "", label: "Choose a type" },
      { value: "HIIT", label: "HIIT" },
      { value: "Strength", label: "Strength" },
      { value: "Cardio", label: "Cardio" },
    ],
  },
  button: {
    id: "add-type-btn",
    label: "Add type",
  },
};
