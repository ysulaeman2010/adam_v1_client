import Home from "./components/Home";

import { Provider } from "react-redux";
import store from "./data/store";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
