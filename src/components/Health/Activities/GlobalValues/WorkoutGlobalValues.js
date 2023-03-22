export const WorkoutTypes = {
  select: {
    id: "workout-types",
    name: "type",
    options: [
      { value: "", label: "Choose a type", disabled: true },
      { value: "Strength", label: "Strength" },
      { value: "Hypertrophy", label: "Hypertrophy" },
      { value: "Endurance", label: "Endurance" },
    ],
  },
};

export const WorkoutTargets = {
  select: {
    id: "workout-targets",
    name: "target",
    options: [
      { value: "", label: "Choose a target", disabled: true },
      { value: "Full Body", label: "Full Body" },
      { value: "Upper Body", label: "Upper Body" },
      { value: "Lower Body", label: "Lower Body" },
      { value: "Front Muscles", label: "Front Muscles" },
      { value: "Back Muscles", label: "Back Muscles" },
      { value: "Mixed", label: "Mixed" },
    ],
  },
};
