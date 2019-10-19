import React from "react";
import Arrow from "../assets/images/arrow.png";

export function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <h4>
          <img src={Arrow} className="arrowSign" />
          Disclaimers
        </h4>
        <div className="footerDisclaimerBox">
          <p className="body2">
            "1": "Achieved in test conditions. Actual fuel consumption may vary
            depending on driving conditions/style, vehicle condition and
            options/accessories fitted. Fuel consumption data provided for
            comparison purposes only. Source: ADR81/02 combined (L/100km) for
            all models."
          </p>
          <p className="body2">
            "2": "Emissions vary depending on driving conditions/style, vehicle
            condition &amp; options/accessories fitted."
          </p>
        </div>
      </div>
    </footer>
  );
}
