import { useEffect, useState } from "react";
import FormSelectInput from "./FormSelectInput";

/** This component makes it possible to add new select inputs by clicking the 'add' button.
 * This allows the user to add multiple options without knowing in advanced how
 * may elements should be added from the beginning.
 */
const IncrementalSelect = (props) => {
  const { info, selectedValues } = props;
  const [count, setCount] = useState(1);
  const [selectList, setSelectList] = useState([newSelectInput(count)]);

  const addSelect = (e) => {
    e.preventDefault();
    //increases the count and adds a new dropdown to the DOM
    setCount((previousCount) => {
      const newCount = previousCount + 1;
      setSelectList((s) => s.concat(newSelectInput(newCount)));
      return newCount;
    });
  };

  function newSelectInput(newCount, value = undefined) {
    return (
      <FormSelectInput
        label={`${info.label.label} ${newCount}`}
        key={`select_${info.select.name}_${newCount}`}
        select={info.select}
        selectedValue={value}
      />
    );
  }

  //This hook is used to add selects automatically on the update page.
  useEffect(() => {
    //skips if no selectedValues has been passed from the parent
    if (!selectedValues || selectedValues.length === 0) {
      return;
    }

    const selectedInputs = [];
    let newCount = 0;
    //creates an array with the pre-selected elements from db (used for updates)
    selectedValues.forEach((value, index) => {
      newCount = index + 1;
      selectedInputs.push(
        <FormSelectInput
          label={`${info.label.label} ${newCount}`}
          key={`select_${info.select.name}_${newCount}`}
          select={info.select}
          selectedValue={value}
        />
      );
    });

    setSelectList(selectedInputs);
    setCount(newCount);
  }, [selectedValues, info]);

  return (
    <div className="mt-6 sm:mt-4 flex flex-col justify-center gap-5">
      {/* Displays all the selects, including the selects being added through btn clicked. */}
      {selectList}

      {/* ADD BUTTON */}
      <div className="mt-4 -mb-2 flex items-center justify-center">
        <button
          type="button"
          id={info.button.id}
          className="inline-flex justify-center text-sm font-semibold text-cyan-700 hover:text-cyan-600"
          onClick={addSelect}
        >
          {info.button.label}
        </button>
      </div>
    </div>
  );
};

export default IncrementalSelect;
