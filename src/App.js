import { useState } from "react";
import { Provider } from "react-redux";
import CheckAuth from "./components/Auth/CheckAuth";
import Router from "./components/Health/Router";
import NavigationBar from "./components/UI/NavigationBar";
import store from './store/index'

function App() {
  const [wasAuthenticationVerified, setAuthenticationStatus] = useState(false);

  return (
    <Provider store={store}>
        <CheckAuth setAuthenticationStatus={setAuthenticationStatus}/>
        <NavigationBar />
        {wasAuthenticationVerified && 
          <main>
            <Router />
          </main>
        }
    </Provider>
  );
}

export default App;
