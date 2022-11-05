import React, { useReducer } from "react";
import App from "./App";
import { initialAppState, userContext } from "./store/store";
import reducer from "./Reducer/appReducer";
const RootApp = () => {
  const [state, dispatch] = useReducer(reducer, initialAppState);

  return (
    <userContext.Provider value={{ state: state, dispatch }}>
      <App />
    </userContext.Provider>
  );
};

export default RootApp;
