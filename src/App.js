import { Provider } from "react-redux";
import HealthContent from "./components/Health/HealthContent";
import NavigationBar from "./components/UI/NavigationBar";
import store from './store/index'

function App() {
  return (
    <Provider store={store}>
        <NavigationBar />
        <main>
          <HealthContent />
        </main>
    </Provider>
  );
}

export default App;
