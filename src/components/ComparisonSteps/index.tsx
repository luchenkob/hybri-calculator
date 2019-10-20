import React, { ReactNode } from "react";
import { Input, Select } from "@hybrid/components";
import Car1 from "../../assets/images/car1.png";
import Car2 from "../../assets/images/car2.png";

function ComparisonStep({
  index,
  children
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <div className="comparisonStep">
      <p className="overlineText text-center">Step {index}</p>
      {children}
    </div>
  );
}

export function ComparisonSteps() {
  return (
    <div className="ComparisonStepsSection">
      <ComparisonStep index={1}>
        <p className="body1 text-center">
          Personalise your driving information to estimate your hybrid saving
        </p>
        <div className="text-center">
          <div className="inputGroup">
            <p className="body1 no-margin">
              <label>Fuel cost per litre </label>
              <Input value="100" currency suffix="[3]" />
            </p>
          </div>
          <div className="inputGroup">
            <p className="body1 no-margin">
              <label>Km's driven per year: </label>
              <Input value="100" suffix="[4]" />
            </p>
          </div>
        </div>
      </ComparisonStep>
      <ComparisonStep index={2}>
        <div className=" text-center">
          <span className="body1">I want to compare </span>
          <div className="compareVehicle">
            <Select
              options={[
                { value: "1", label: "RAV4" },
                { value: "2", label: "Corolla" },
                { value: "3", label: "Prius" },
                { value: "4", label: "Prius C" },
                { value: "5", label: "Prius V" }
              ]}
              value="1"
              onChange={() => {}}
            />
          </div>
          <span className="body1">vehicles</span>
        </div>
        <div className="text-center">
          <div className="inputGroup">
            <p className="captionText">Comparison vehicle </p>
            <div className="comparisonVehicle">
              <Select
                options={[
                  { value: "1", label: "RAV4" },
                  { value: "2", label: "Corolla" },
                  { value: "3", label: "Prius" },
                  { value: "4", label: "Prius C" },
                  { value: "5", label: "Prius V" }
                ]}
                value="1"
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="inputGroup">
            <p className="captionText">Hybrid vehicle </p>
            <div className="comparisonVehicle">
              <Select
                options={[
                  { value: "1", label: "RAV4" },
                  { value: "2", label: "Corolla" },
                  { value: "3", label: "Prius" },
                  { value: "4", label: "Prius C" },
                  { value: "5", label: "Prius V" }
                ]}
                value="1"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inputGroup">
            <div className="comparisonVehicle">
              <div className="carPicture">
                <img src={Car2} />
              </div>
            </div>
          </div>
          <div className="inputGroup">
            <div className="comparisonVehicle">
              <div className="carPicture">
                <img src={Car1} />
              </div>
            </div>
          </div>
        </div>
      </ComparisonStep>
    </div>
  );
}
