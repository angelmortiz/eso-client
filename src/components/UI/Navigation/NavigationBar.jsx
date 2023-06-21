import { Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { logout } from "../../../util/apis/auth/authApis";
import { authActions } from "../../../store/authSlice";
import { userActions } from "../../../store/userSlice";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const navMenuValues = [
  {
    title: "My Programs",
    items: [
      { label: "Assigned", path: "/activities/programplan/assigned" },
      { label: "Completed", path: "/activities/programplan/completed" },
    ],
  },
  {
    title: "Activites",
    items: [
      { label: "Programs", path: "/activities/programs" },
      { label: "Workouts", path: "/activities/workouts" },
      { label: "Exercises", path: "/activities/exercises" },
      { label: "Muscles", path: "/activities/muscles" },
      { label: "Equipments", path: "/activities/equipments" },
    ],
  },
  {
    title: "Add New",
    items: [
      { label: "Program", path: "/activities/add-program" },
      { label: "Workout", path: "/activities/add-workout" },
      { label: "Exercise", path: "/activities/add-exercise" },
      { label: "Muscle", path: "/activities/add-muscle" },
      { label: "Equipment", path: "/activities/add-equipment" },
    ],
  },
  {
    title: "Assign",
    items: [{ label: "Program", path: "/activities/programplan/assign" }],
  },
];

const navAvatarValues = [
  {
    label: "Profile",
    path: "/user/info",
    requiresAuthentication: true,
  },
  {
    label: "Log in",
    path: "/auth/login",
    requiresAuthentication: false,
  },
  {
    label: "Sign up",
    path: "/auth/signup",
    requiresAuthentication: false,
  },
];

const NavigationBar = (props) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(
    (state) => state.auth.isUserAuthenticated
  );
  //user info, pull user pic
  // const currentUserInfo = useSelector((state) => state.userInfo.userInfo);

  const userLogout = (e) => {
    e.preventDefault();
    logout().then((response) => {
      if (response && response.isSuccess) {
        dispatch(authActions.logout());
        dispatch(userActions.removeUserInfo());
        navigateTo("/auth/login");
      }
    });
  };

  return (
    <header>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            {/* DESKTOP VIEW */}
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-14 justify-between md:h-16">
                {/* MOBILE MENU BUTTON */}
                {isUserAuthenticated && (
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-700">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                )}

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="h-10 w-auto"
                        src="/icon-logo.png"
                        alt="En Salud Óptima"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-4 md:space-x-6">
                    {isUserAuthenticated &&
                      navMenuValues.map((menu) => (
                        <Menu
                          key={`desktop_${menu.title}`}
                          as="div"
                          className="relative inline-block text-left"
                        >
                          {/* active classes: inline-flex items-center h-full border-b-2 border-cyan-600 px-1 pt-1 text-sm font-medium text-gray-900*/}
                          {/* inactive classe: inline-flex items-center h-full border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700*/}
                          <Menu.Button className="inline-flex h-full items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 md:text-base md:font-normal">
                            {menu.title}
                            <ChevronDownIcon
                              className="-mr-1 ml-0.5 h-3 w-3 text-gray-400 lg:h-4 lg:w-4"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute left-0 z-10 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {menu.items.map((item) => (
                                <Menu.Item
                                  key={`desktop_${menu.title}_${item.label}`}
                                  className="rounded-md"
                                >
                                  {({ active }) => (
                                    <Link
                                      to={item.path}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      {item.label}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ))}
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* NOTIFICATIONS BUTTON */}
                  {/* <button
                    type="button"
                    className="rounded-full bg-white p-1 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* PROFILE DROPDOWN */}
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button className="flex rounded-full bg-white p-1 text-gray-500 ring-2 ring-gray-300 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600">
                      <span className="sr-only">Open user menu</span>
                      {/* Profile picture */}
                      <UserIcon className="h-6 w-6" aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {navAvatarValues.map((item) => {
                          const menuItem = (
                            <Menu.Item
                              key={`${item.label}`}
                              className="rounded-md"
                            >
                              {({ active }) => (
                                <Link
                                  to={item.path}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.label}
                                </Link>
                              )}
                            </Menu.Item>
                          );

                          //if 'requiresAuthentication' only displays after user has authenticated.
                          //otherwise, only show if user is not authenticated
                          return item.requiresAuthentication ===
                            isUserAuthenticated
                            ? menuItem
                            : "";
                        })}
                        {/* Log out option */}
                        {isUserAuthenticated && (
                          <Menu.Item key="Log out">
                            {({ active }) => (
                              <button
                                onClick={userLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block w-full rounded-md px-4 py-2 text-left text-sm text-gray-700"
                                )}
                              >
                                Log out
                              </button>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            {/* MOBILE VIEW */}
            <Disclosure.Panel className="sm:hidden">
              {isUserAuthenticated &&
                navMenuValues.map((menu) => (
                  <Disclosure key={`mobile_${menu.title}`}>
                    {({ open }) => (
                      <>
                        {/* cyan bg: flex w-full justify-between border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-cyan-800 hover:bg-cyan-700 hover:opacity-90 hover:text-white*/}
                        {/* white bg: flex w-full justify-between border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-cyan-800 hover:border-opacity-70 hover:bg-gray-50 hover:text-gray-700*/}
                        <Disclosure.Button className="flex w-full justify-between border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-cyan-800 hover:border-opacity-70 hover:bg-gray-50 hover:text-gray-700">
                          <span>{menu.title}</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-700`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          {/* cyan bg: block border-l-8 border-transparent py-2 pl-5 pr-4 text-sm font-medium text-gray-500 hover:border-cyan-800 hover:bg-cyan-700 hover:opacity-90 hover:text-white */}
                          {/* white bg: block border-l-8 border-transparent py-2 pl-5 pr-4 text-sm font-medium text-gray-500 hover:border-cyan-800 hover:border-opacity-70 hover:bg-gray-50 hover:text-gray-700*/}
                          {menu.items.map((item) => (
                            <Disclosure.Button
                              key={`mobile_${menu.title}_${item.label}`}
                              as="a"
                              href={item.path}
                              className="block border-l-8 border-transparent py-2 pl-5 pr-4 text-sm font-medium text-gray-500 hover:border-cyan-800 hover:border-opacity-70 hover:bg-gray-50 hover:text-gray-700"
                            >
                              {item.label}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};

export default NavigationBar;
