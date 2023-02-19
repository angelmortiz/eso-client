import styles from '../../../UI/General/CSS/Form.module.css';

const AddSetLog = (props) => {
  const { setNumber, exercise, count } = props;
  return (
    <div>
      {/* SET LOG */}
      <div className={styles['select-inputs-small-div']}>
        <label htmlFor="setlog-info" className={styles['text-label']}>
          <strong>Set {setNumber}:</strong>
        </label>
        <label className={styles['text-label-small']}>Weight:</label>
        <input
          type="number"
          name={`setlog_weight_${setNumber}`}
          className={styles['select-input-medium']}
          min="0"
          //   value={tempo[0]}
          //   onChange={(e) => setTempo((x) => [e.target.value, x[1], x[2], x[3]])}
        />
        <label className={styles['text-label-small']}>Reps:</label>
        <input
          type="number"
          name={`setlog_reps_${setNumber}`}
          className={styles['select-input-medium']}
          min="0"
          //   value={tempo[1]}
          //   onChange={(e) => setTempo((x) => [x[0], e.target.value, x[2], x[3]])}
        />
        <label className={styles['text-label-small']}>RIR:</label>
        <input
          type="number"
          name={`setlog_rir_${setNumber}`}
          className={styles['select-input-medium']}
          min="0"
          //   value={tempo[2]}
          //   onChange={(e) => setTempo((x) => [x[0], x[1], e.target.value, x[3]])}
        />
      </div>
    </div>
  );
};
export default AddSetLog;
