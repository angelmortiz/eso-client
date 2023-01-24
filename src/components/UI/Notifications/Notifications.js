import { useRef } from "react";
import ToastNotification from "./ToastNotification";

const Notifications = props => {
    const toastNotification = useRef(null);

    const showToastNotification = () => {
        toastNotification.current.show();
    };

    return (
      <ToastNotification ref={toastNotification} type="fail"  message="Action completed completed completed successfully."/>
    )
};

export default Notifications;