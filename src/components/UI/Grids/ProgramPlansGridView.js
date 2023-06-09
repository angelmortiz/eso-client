const ProgramPlansGridView = (props) => {
  const { title, children } = props;

  return (
    <div className="my-6 flex flex-col px-6 sm:my-8 sm:px-8">
      <h1 className="mx-auto mb-8 text-2xl font-semibold leading-6 text-gray-900 ">
        {title}
      </h1>
      {!children ? (
        <img
          src="/loading.gif"
          alt="Loading..."
          className="mx-auto h-10 w-10"
        />
      ) : (
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          {children.length > 0 && children}
        </ul>
      )}
    </div>
  );
};

export default ProgramPlansGridView;
