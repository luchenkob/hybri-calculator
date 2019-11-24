import React from "react";
import { Button } from "@hybrid/components";

export function Contact({ modelData }: { modelData: any }) {
  const sendMessageExplore = () => {
    const { selectedHybridVehicle, selectedModel } = modelData;
    window.parent.postMessage(
      {
        type: "exit-brand-experience",
        modelId: selectedModel,
        materialCode: selectedHybridVehicle.materialCode
      },
      "*"
    );
  };

  const sendMessageGetInTouch = () => {
    const { selectedHybridVehicle, selectedModel } = modelData;
    const {
      grade,
      engineFuel,
      drivetrain,
      transmission,
      materialCode
    } = selectedHybridVehicle;
    window.parent.postMessage(
      {
        type: "exit-contact-a-dealer",
        modelId: selectedModel,
        materialCode,
        modelDetail: {
          grade,
          engineFuel,
          drivetrain,
          transmission
        }
      },
      "*"
    );
  };
  return (
    <div className="contactSection">
      <div className="contactContainer">
        <h2>
          Find out more about your perfect Hybrid or speak to our specialist.
        </h2>
        <Button onClick={sendMessageExplore} className="secondaryButton">
          Explore Now
        </Button>
        <Button onClick={sendMessageGetInTouch} className="primaryButton">
          Get In Touch
        </Button>
      </div>
    </div>
  );
}
