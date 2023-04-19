const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const GridView = (props) => {
  const { title, children, gridSize } = props;

  return (
    <div className="my-6 flex flex-col px-8 sm:my-10 sm:px-10">
      <h1 className="mx-auto mb-5 text-2xl font-semibold leading-6 text-gray-900 sm:mb-8">
        {title}
      </h1>
      {!children && (
        <img
          src="/loading.gif"
          alt="Loading..."
          className="mx-auto h-10 w-10"
        />
      )}

      <ul
        className={classNames(
          "grid grid-cols-1 gap-6",
          gridSize === "sm"
            ? "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            : gridSize === "md"
            ? "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
            : "md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        )}
      >
        {children.length > 0 && children}
      </ul>
    </div>
  );
};

export default GridView;
