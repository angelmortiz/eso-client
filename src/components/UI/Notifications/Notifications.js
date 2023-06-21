import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ToastNotification from './ToastNotification';

const Notifications = (props) => {
  const toastNotification = useRef(null);
  const toastNotificationInfo = useSelector(
    (state) => state.toast.notificationInfo
  );

  //fires up the toast notifications when fetch apis get an error
  useEffect(() => {
    if (toastNotificationInfo.show) {
      showToastNotification();
    }
  }, [toastNotificationInfo.show]);

  //use Ref to call an internal function inside toast notification component (using useImperativeHandle)
  const showToastNotification = () => {
    toastNotification.current.show();
  };

  return (
    <ToastNotification
      ref={toastNotification}
      type={toastNotificationInfo.type}
      title={toastNotificationInfo.title}
      message={toastNotificationInfo.message}
    />
  );
};

export default Notifications;
