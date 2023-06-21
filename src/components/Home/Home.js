import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = (props) => {
  const isUserAuthenticated = useSelector(
    (state) => state.auth.isUserAuthenticated
  );

  return (
    <div className="-mt-10 flex min-h-screen flex-col items-center justify-center gap-8 px-8 sm:gap-12 sm:px-10">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Welcome to
        </h1>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          En Salud Óptima
        </h1>
      </div>
      <p className="text-center text-lg leading-8 text-gray-600">
        Welcome to your personal fitness journey. Customized workout programs to guide you toward optimal health.
      </p>
      <div className="flex items-center justify-center gap-x-6">
        {!isUserAuthenticated && (
          <Link
            to="/auth/login"
            className="text-md inline-flex font-semibold text-cyan-700 underline-offset-4 hover:text-cyan-600"
          >
            <h2>Login</h2>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
