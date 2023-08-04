import store from '../../store/index';
import { toastNotificationActions } from '../../store/toastNotificationSlice';
import { logout } from './auth/authApis';

const APP_API = process.env.REACT_APP_API_URL;
console.log(`API requests sent to address: '${APP_API}'`);

export const apiGet = (path) => {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return fetchAction(path, requestOptions, 'getting');
};

export const apiPost = (path, body) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  };

  return fetchAction(path, requestOptions, 'posting');
};

export const apiPut = (path, body) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  };

  return fetchAction(path, requestOptions, 'putting');
};

export const apiPatch = (path, body) => {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  };

  return fetchAction(path, requestOptions, 'patching');
};

export const apiDelete = (path) => {
  const requestOptions = {
    method: 'DELETE',
    credentials: 'include',
  };

  return fetchAction(path, requestOptions, 'deleting');
};

const fetchAction = async (path, requestOptions, actionName) => {
  try {
    const apiResponse = await fetch(`${APP_API}${path}`, requestOptions);
    const response = await apiResponse.json();

    //Middleware to catch fails and errors from backend and show them in the notifications
    if (!response?.isSuccess) {
      console.error('Error in response: ', response);
      store.dispatch(
        toastNotificationActions.showNotification({
          type: 'fail',
          message: response.message,
        })
      );

      //TODO: Implement a better strategy to identify when the user has not JWT
      // if (response && response.message === "No authorization token found."){
      // }
    }

    return response;
  } catch (error) {
    console.error(`An error ocurred while ${actionName} document: `, error);
  }
};
