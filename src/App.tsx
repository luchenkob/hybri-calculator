import React from "react";
import logo from "./logo.svg";
import { Header, Footer } from "@hybrid/layouts";
import { Contact, CompareHybrid } from "@hybrid/components";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      {/* <main>Main Component there</main> */}
      <main>
        <CompareHybrid />
      </main>
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
