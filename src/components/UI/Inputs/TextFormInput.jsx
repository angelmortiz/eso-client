const TextFormInput = (props) => {
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
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
        {label}
        {requiredField && <span className="text-red-800">{' *'}</span>}
      </label>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <input
          {...inputProps}
          onChange={onChange}
          name={name}
          className="block w-full max-w-lg rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
        />
      </div>
      {/* displays all errors associated to the input above */}
      {errors?.map((error, index) => 
        <div key={`${name}-error-${index}`} className="mx-1 mt-1 text-red-800 text-sm">{error}</div>
      )}
    </div>
  );
};

export default TextFormInput;
