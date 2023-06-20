import { useEffect, useState } from 'react';
import AddSetLog from './AddSetLog';

/** This component makes it possible to add new set logs to
 * the program plan log by clicking the 'add' button.
 * This allows the user to add multiple options without the need
 * of knowing in advanced how  may elements should be added.
 */
const IncrementalSetLogs = (props) => {
  const { exercise } = props;
  const [count, setCount] = useState(1);
  const [setLogsList, setSetLogsList] = useState([]);
  const [enableAddSetBtn, setEnableAddSetBtn] = useState(false);
  const [, setMapActiveEdits] = useState(() => new Map());

  //automatically populates the exercise sets if it's an active exercise
  useEffect(() => {
    if (exercise?.sets.length === 0) {
      setSetLogsList([getNewSetLog(count)]);
      return;
    }

    updateSetLogList();
    setEnableAddSetBtn(true);
  },[]);

  const updateSetLogList = () => {
    const setList = [];
    exercise.sets.forEach((set, index) => {
      setList.push(
        getNewSetLog(index+1, {
          _id: set._id,
          weight: set.weight,
          reps: set.reps,
          rir: set.rir,
        })
      );
    });
    setSetLogsList(setList);
    setCount(setList.length);
  }

  function getNewSetLog(setNumber, setValues) {
    return (
      <AddSetLog
        setNumber={setNumber}
        key={`set-log_${setNumber}`}
        setEditingSet={setEditingSet}
        exercisePlanId={exercise._id}
        setValues={setValues}
        removeSetLog={removeSetLog}
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

  function removeSetLog(setNumber) {
    if (exercise?.sets) delete exercise.sets[setNumber-1]

    updateSetLogList();
    //TODO: Check if the logic below should be implemented
    // setSetLogsList(prev => {
    //     delete prev[setNumber-1]
    //     if (exercise?.sets) delete exercise.sets[setNumber-1];
    //     prev.forEach((set, index) => set.props.setNumber = index+1)
    //     return [...prev];
    // });
  }

  const addSetToDOM = () => {
    setEnableAddSetBtn(false);
    //increases the count and adds a new set to the DOM
    setCount((previousCount) => {
      const newCount = previousCount + 1;
      setEditingSet(newCount, true);
      setSetLogsList((s) => s.concat(getNewSetLog(newCount)));
      return newCount;
    });
  };

  return (
    <div>
      {/* Displays all the set logs */}
      {setLogsList}

      {/* ADD BUTTON */}

      {enableAddSetBtn && (
        <button
          type="button"
          id="save-set-log"
          onClick={addSetToDOM}
        >
          Add Set
        </button>
      )}
    </div>
  );
};

export default IncrementalSetLogs;
