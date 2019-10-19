import React, { ReactNode } from "react";

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
        <p className="body1 text-center">
          <div className="inputGroup">
            <label>Fuel cost per litre </label>
            <input type="text" />
          </div>
          <div className="inputGroup">
            <label>Km's driven per year: </label>
            <input type="text" />
          </div>
        </p>
      </ComparisonStep>
      <ComparisonStep index={2}>
        <p className="body1 text-center">
          I want to compare{" "}
          <select>
            <option>RAV4</option>
            <option>Corolla</option>
            <option>Prius</option>
            <option>Prius C</option>
            <option>Prius V</option>
          </select>
          vehicles
        </p>
        <p className="body1 text-center">
          <div className="inputGroup">
            <p className="captionText">Comparison vehicle </p>
            <select>
              <option>RAV4</option>
              <option>Corolla</option>
              <option>Prius</option>
              <option>Prius C</option>
              <option>Prius V</option>
            </select>
          </div>
          <div className="inputGroup">
            <p className="captionText">Hybrid vehicle </p>
            <select>
              <option>RAV4</option>
              <option>Corolla</option>
              <option>Prius</option>
              <option>Prius C</option>
              <option>Prius V</option>
            </select>
          </div>
        </p>
      </ComparisonStep>
    </div>
  );
}
