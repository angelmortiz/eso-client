import { useState } from 'react';
import styles from '../../../UI/General/CSS/Form.module.css';
import AddSetLog from './AddSetLog';

/** This component makes it possible to add new set logs to
 * the program plan log by clicking the 'add' button.
 * This allows the user to add multiple options without the need
 * of knowing in advanced how  may elements should be added.
 */
const IncrementalSetLogs = (props) => {
  const { exercisePlanId } = props;
  const [count, setCount] = useState(1);
  const [setLogsList, setSetLogsList] = useState([getNewSetLog(count)]);
  const [enableAddSetBtn, setEnableAddSetBtn] = useState(false);
  const [, setMapActiveEdits] = useState(() => new Map());

  function getNewSetLog(newCount) {
    return (
      <AddSetLog
        setNumber={newCount}
        key={`set-log-_${newCount}`}
        setEditingSet={setEditingSet}
        exercisePlanId={exercisePlanId}
      />
    );
  }

  function setEditingSet(setNumber, isEditing) {
    if (isEditing) {
      /**
       * Adds value to the map and creates a new Map to force
       * react to re-render the component with the new map vals.
       */
      setMapActiveEdits(
        (prevMap) => new Map(prevMap.set(setNumber, isEditing))
      );
      setEnableAddSetBtn(false);
    } else {
      /**
       * Removes value from the map and creates a new Map to force
       * react to re-render the component.
       * Also, enables the Add Set button if there are no sets being edited.
       */
      setMapActiveEdits((prevMap) => {
        prevMap.delete(setNumber);
        setEnableAddSetBtn(prevMap.size === 0);
        return new Map(prevMap);
      });
    }
  }

  const addSetToDOM = () => {
    setEnableAddSetBtn(false);
    //increases the count and adds a new set to the DOM
    setCount((previousCount) => {
      const newCount = previousCount + 1;
      setSetLogsList((s) => s.concat(getNewSetLog(newCount)));
      return newCount;
    });
  };

  return (
    <div className={styles['plan-list']}>
      {/* Displays all the set logs */}
      {setLogsList}

      {/* ADD BUTTON */}

      {enableAddSetBtn && (
        <button
          type="button"
          id="save-set-log"
          className={styles['add-btn-medium']}
          onClick={addSetToDOM}
        >
          Add Set
        </button>
      )}
    </div>
  );
};

export default IncrementalSetLogs;
