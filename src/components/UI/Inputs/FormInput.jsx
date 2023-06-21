import styles from '../General/CSS/Form.module.css';

// DELETE: After all components have been updated to new inputs
const FormInput = (props) => {
  const {
    name,
    label,
    pattern,
    errors,
    onChange,
    ...inputProps
  } = props;

  return (
    <>
      <label htmlFor={name} className={styles['text-label']}>
        {label}:
      </label>
      <input
        {...inputProps}
        onChange={onChange}
        name={name}
        className={styles['select-input']}
      />
      {/* displays all errors associated to the input above */}
      {errors.map((error, index) => 
        <span key={`${name}-error-${index}`} className={styles['error-text']}>{error}</span>
      )}
    </>
  );
};

export default FormInput;
