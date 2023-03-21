import { useEffect, useState } from 'react';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const FormSelectInput = (props) => {
  let { label, setValue, select, selectedValue, count, requiredField, width } = props;
  const [selectValue, setSelectValue] = useState('');

  const optionValue = select?.value || 'value'; //handles cases where the select's value has a different name (Ex. _id).
  const optionLabel = select?.label || 'label'; //handles cases where the select's label has a different name (Ex. name).
  const countStr = (count = count ? `_${count}` : ''); //not all FormSelectInput callers provide a count prop
  const selectId = `select_${select?.name}${count}`; //creating an unique id and key select value

  //updates the pre-selected value when it changes on the prop from the parent
  useEffect(() => {
    setSelectValue(selectedValue);
  }, [selectedValue]);

  /** if a function was passed to set the value in the parent component,
   * executes the function whenever the value in the input changes.*/
  useEffect(() => {
    if (setValue) setValue(selectValue);
  }, [selectValue, setValue]);

  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor={label}
        className="text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
      >
        {label}
        {requiredField && <span className="text-red-800">{' *'}</span>}
      </label>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <select
          id={selectId}
          key={selectId}
          name={select?.name}
          className={classNames(
            'block w-full rounded-md border-0 py-2 px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6',
            !width ? 'sm:max-w-xs' : `sm:max-w-${width}`,
            selectValue === '' ? 'text-gray-400' : 'text-gray-900',
          )}
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          {select?.options.map((option) => {
            return (
              <option
                key={`${option[optionValue]}${countStr}`}
                value={option[optionValue]}
                disabled={option.disabled}
              >
                {option[optionLabel]}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FormSelectInput;
