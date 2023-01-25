import { forwardRef, useImperativeHandle, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toastNotificationActions } from '../../../store/toastNotificationSlice';
import styles from './ToastNotification.module.css';

const types = {
  success: 'success',
  fail: 'fail',
  warning: 'warning',
};

const ToastNotification = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [notificationState, setNotificationState] = useState('hide');
  const { type, message } = props;

  //shows the toast notification for a few seconds before hiding back
  useImperativeHandle(ref, () => ({
    show() {
      setNotificationState('show');
      setTimeout(() => {
        setNotificationState('hide');

        //clears the notification info from the Redux store
        dispatch(toastNotificationActions.clearUpNotification());
      }, 3800);
    },
  }));

  return (
    <div
      className={`${styles['notification']} ${styles[type]} ${styles[notificationState]}`}
    >
      {/* ICON */}
      <div className={styles['icon']}>
        {/* SUCCESSFUL ICON */}
        {type === types.success && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles['svg-icon']}
            viewBox="0 0 512 512"
          >
            <title>Checkmark Circle</title>
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M352 176L217.6 336 160 272"
            />
          </svg>
        )}

        {/* WARNING ICON */}
        {type === types.warning && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles['svg-icon']}
            viewBox="0 0 512 512"
          >
            <title>Warning</title>
            <path
              d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
            <path
              d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
            <path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z" />
          </svg>
        )}

        {/* FAIL ICON */}
        {type === types.fail && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles['svg-icon']}
            viewBox="0 0 512 512"
          >
            <title>Close Circle</title>
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M320 320L192 192M192 320l128-128"
            />
          </svg>
        )}
      </div>

      {/* MESSAGE */}
      <div className={styles['message']}>{message}</div>
    </div>
  );
});

export default ToastNotification;
