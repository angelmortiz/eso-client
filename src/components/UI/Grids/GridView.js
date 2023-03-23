const GridView = (props) => {
  return (
    <div className="my-6 flex flex-col px-8 sm:my-10 sm:px-10">
      <h1 className="mx-auto mb-5 text-2xl font-semibold leading-6 text-gray-900 sm:mb-8">
        {props.title}
      </h1>
      {!props.children && (
        <img
          src="/loading.gif"
          alt="Loading..."
          className="mx-auto h-10 w-10"
        />
      )}

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {props.children.length > 0 && props.children}
      </ul>
    </div>
  );
};

export default GridView;
