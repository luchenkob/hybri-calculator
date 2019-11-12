import React from "react";
import { Button } from "@hybrid/components";

export function Header() {
  const sendMessageCloseWindow = () => {
    window.parent.postMessage({ type: "close-overlay" }, "*");
  };
  return (
    <header>
      <div className="headerContainer">
        <h1>Your Hybrid Comparison</h1>
        <Button
          className="closeButton"
          iconType={Button.iconType.CloseImage}
          onClick={sendMessageCloseWindow}
        ></Button>
      </div>
    </header>
  );
}
