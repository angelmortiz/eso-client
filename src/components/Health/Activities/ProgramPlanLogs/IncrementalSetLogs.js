import { useState } from 'react';
import { patchAddSetLog } from '../../../../util/apis/activities/programPlans/programPlansApis';
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
  const [enableSetBtn, setEnableSetBtn] = useState(false);

  function getNewSetLog(newCount) {
    return (
      <AddSetLog
        setNumber={newCount}
        key={`set-log-_${newCount}`}
        enableAddSetBtn={enableAddSetBtn}
        exercisePlanId={exercisePlanId}
      />
    );
  }

  function enableAddSetBtn(status) {
    setEnableSetBtn(status);
  }

  const addSetToDOM = () => {
    setEnableSetBtn(false);
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

      {enableSetBtn && (
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
