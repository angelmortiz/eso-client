import { Provider } from "react-redux";
import AutoLogin from "./components/Auth/AutoLogin";
import HealthContent from "./components/Health/HealthContent";
import NavigationBar from "./components/UI/NavigationBar";
import store from './store/index'

function App() {
  return (
    <Provider store={store}>
        <AutoLogin/>
        <NavigationBar />
        <main>
          <HealthContent />
        </main>
    </Provider>
  );
}

export default App;
