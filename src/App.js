import { Fragment } from "react";
import HealthContent from "./components/Health/HealthContent";
import NavigationBar from "./components/UI/NavigationBar";

function App() {
  return (
    <Fragment>
      <NavigationBar />
      <main>
        <HealthContent />
      </main>
    </Fragment>
  );
}

export default App;
