import React from "react";
import logo from "./logo.svg";
import { Header, Footer } from "@hybrid/layouts";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      {/* <main>Main Component there</main> */}
      <Footer />
    </div>
  );
};

export default App;
