import { useEffect, useState } from 'react';
import styles from '../General/CSS/Form.module.css';

//DELETE: After all components using this inputs have been updated
const SelectInput = (props) => {
  const [selectValue, setSelectValue] = useState('');

  const setValueFunc = props.setValue;
  const info = props.select;
  const optionValue = info.value || 'value'; //handles cases where the select's value has a different name (Ex. _id).
  const optionLabel = info.label || 'label'; //handles cases where the select's label has a different name (Ex. name).
  const count = props.count ? `_${props.count}` : ''; //not all SelectInput callers provide a count prop
  const selectId = `select_${info.name}${count}`; //creating an unique id and key select value

  //updates the pre-selected value when it changes on the prop from the parent
  useEffect(() => {
    setSelectValue(props.selectedValue);
  }, [props.selectedValue]);

  /** if a function was passed to set the value in the parent component,
   * executes the function whenever the value in the input changes.*/ 
  useEffect(() => {
    if (setValueFunc) setValueFunc(selectValue);
  }, [selectValue, setValueFunc])

  return (
    <div className={styles['select-content']}>
      <select
        id={selectId}
        key={selectId}
        name={info.name}
        className={styles['select-input']}
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
      >
        {info.options.map((option) => {
          return (
            <option
              key={`${option[optionValue]}${count}`}
              value={option[optionValue]}
            >
              {option[optionLabel]}
            </option>
          );
        })}
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles['select-arrow']}
        viewBox="0 0 512 512"
      >
        <title>Chevron Down</title>
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="30"
          d="M112 184l144 144 144-144"
        />
      </svg>
    </div>
  );
};

export default SelectInput;
