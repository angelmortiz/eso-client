import classes from '../CSS/Form.module.css';

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
      <label htmlFor={name} className={classes['text-label']}>
        {label}:
      </label>
      <input
        {...inputProps}
        onChange={onChange}
        name={name}
        className={classes['select-input']}
      />
      {/* displays all errors associated to the input above */}
      {errors.map((error, index) => 
        <span key={`${name}-error-${index}`} className={classes['error-text']}>{error}</span>
      )}
    </>
  );
};

export default FormInput;
