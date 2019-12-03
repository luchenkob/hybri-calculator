import React from "react";
import { Button } from "@hybrid/components";
import { CustomWindow } from "../type";

declare let window: CustomWindow;

export function Header() {
  const sendMessageCloseWindow = () => {
    window.parent.postMessage({ type: "close-overlay" }, "*");
    window.dataLayer.push({
      event: "gaClick",
      eventCategory: "Hybrid Calculator",
      eventAction: "button",
      eventLabel: "close"
    });
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
