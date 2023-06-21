import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { toastNotificationActions } from "../../../store/toastNotificationSlice";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

const types = {
  success: "success",
  fail: "fail",
  warning: "warning",
};

const ToastNotification = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [notificationState, setNotificationState] = useState("hide");
  const { type, title, message } = props;

  //shows the toast notification for a few seconds before hiding back
  useImperativeHandle(ref, () => ({
    show() {
      setNotificationState("show");
      setTimeout(() => {
        closeNotification();
      }, 3800);
    },
  }));

  const closeNotification = () => {
    setNotificationState("hide");

    //clears the notification info from the Redux store
    dispatch(toastNotificationActions.clearUpNotification());
  };

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-10"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={notificationState === "show"}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="roupointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black  ring-opacity-10">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {/* SUCCESS */}
                    {type === types.success && (
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-500"
                        aria-hidden="true"
                      />
                    )}
                    {/* WARNING */}
                    {type === types.warning && (
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-yellow-500"
                        aria-hidden="true"
                      />
                    )}
                    {/* FAIL */}
                    {type === types.fail && (
                      <ExclamationCircleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">{message}</p>
                  </div>
                  {/* TODO: Implement a close button
                    Note: I tried this before, but there was a conflict between the "pointer-events-none" property in the parent div and the actions on the screen. When "pointer-events-none" is used, the x mark cannot be clicked, but when the "pointer-events-none" is removed, the overlay blocks the actions on the entire page
                  */}
                  {/* <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500"
                      onClick={() => {
                        closeNotification();
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
});

export default ToastNotification;
