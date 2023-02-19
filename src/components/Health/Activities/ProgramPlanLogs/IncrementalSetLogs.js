import { useState } from 'react';
import styles from '../../../UI/General/CSS/Form.module.css';
import AddSetLog from './AddSetLog';

/** This component makes it possible to add new set logs to
 * the program plan log by clicking the 'add' button.
 * This allows the user to add multiple options without the need
 * of knowing in advanced how  may elements should be added.
 */
const IncrementalSetLogs = (props) => {
  const { exercise } = props;
  const [count, setCount] = useState(1);
  const [setLogsList, setSetLogsList] = useState([newSetLog(count)]);

  const addSetLog = (e) => {
    e.preventDefault();
    //increases the count and adds a new dropdown to the DOM
    setCount((previousCount) => {
      const newCount = previousCount + 1;
      setSetLogsList((s) => s.concat(newSetLog(newCount)));
      return newCount;
    });
  };

  function newSetLog(newCount) {
    return (
      <AddSetLog
        setNumber={newCount}
        key={`set-log-_${newCount}`}
        exercise={exercise}
      />
    );
  }

  return (
    <div className={styles['plan-list']}>
      {/* Displays all the set logs */}
      {setLogsList}

      {/* ADD BUTTON */}
      <button
        type="button"
        id="save-set-log"
        className={styles['add-btn']}
        onClick={addSetLog}
      >
        Save Set
      </button>
    </div>
  );
};

export default IncrementalSetLogs;
