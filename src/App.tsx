import React, { useEffect } from "react";
import { Comparison } from "./pages/Comparison";
import "./App.css";
import { Route } from "react-router";

const App: React.FC = () => {
  useEffect(() => {
    window.addEventListener("message", data => console.log(data), false);
  });
  return (
    <div className="App">
      <Route
        path="/"
        // search="?modelId=modelId"
        component={Comparison}
      />
    </div>
  );
};

export default App;
