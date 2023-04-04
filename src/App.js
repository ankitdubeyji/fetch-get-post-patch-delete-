import "./App.css";
import Home from "./component/Home";
import { Provider } from "react-redux";
import store from "./component/Store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
