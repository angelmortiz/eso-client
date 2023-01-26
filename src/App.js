import { useState } from 'react';
import { Provider } from 'react-redux';
import CheckAuth from './components/Auth/CheckAuth';
import Router from './components/Router';
import NavigationBar from './components/UI/Navigation/NavigationBar';
import Notifications from './components/UI/Notifications/Notifications';
import store from './store/index';

function App() {
  const [wasAuthenticationVerified, setAuthenticationStatus] = useState(false);

  return (
    <Provider store={store}>
      <CheckAuth setAuthenticationStatus={setAuthenticationStatus} />
      <Notifications />
      <NavigationBar />
      {wasAuthenticationVerified && (
        <main>
          <Router />
        </main>
      )}
    </Provider>
  );
}

export default App;
