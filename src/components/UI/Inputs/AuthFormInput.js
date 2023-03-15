const AuthFormInput = (props) => {
  const {
    name,
    label,
    errors,
    onChange,
    pattern,
    requiredField,
    ...inputProps
  } = props;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        {requiredField && <span className="text-red-800">{' *'}</span>}
      </label>
      <div className="mt-2">
        <input
          {...inputProps}
          onChange={onChange}
          name={name}
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-700 sm:text-sm sm:leading-6 appearance-none"
        />
      </div>
      {/* displays all errors associated to the input above */}
      {errors.map((error, index) => 
        <div key={`${name}-error-${index}`} className="mx-1 mt-1 text-red-800">{error}</div>
      )}
    </div>
  );
};

export default AuthFormInput;
