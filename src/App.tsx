import { Provider } from "react-redux";
import { store } from "./store";
import RootNavigator from "./navigation/RootNavigator";

function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
