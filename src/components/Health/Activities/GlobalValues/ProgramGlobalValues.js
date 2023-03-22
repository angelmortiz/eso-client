export const ProgramTypes = {
  select: {
    id: "program-type",
    name: "type",
    options: [
      { value: "", label: "Choose a type", disabled: true },
      { value: "Strength", label: "Strength" },
      { value: "Hypertrophy", label: "Hypertrophy" },
      { value: "Endurance", label: "Endurance" },
      { value: "Mixed", label: "Mixed" },
    ],
  },
};

export const ProgramSequence = {
  select: {
    id: "program-sequence",
    name: "sequence",
    options: [
      { value: "", label: "Choose a sequence", disabled: true },
      { value: "Weekly", label: "Weekly" },
      { value: "Cycle", label: "Cycle" },
    ],
  },
};
