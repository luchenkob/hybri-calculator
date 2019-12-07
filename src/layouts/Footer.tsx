import React, { useState } from "react";
import Arrow from "../assets/images/arrow.png";

export function Footer({
  disclaimersInfo,
  compareData,
  selectedModel
}: {
  disclaimersInfo: any;
  compareData: any;
  selectedModel: any;
}) {
  const [open, setOpen] = useState(true);

  const toggleOpen = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <footer>
      {compareData && (
        <div className="footerContainer">
          <h4 className={open ? "open" : ""} onClick={toggleOpen}>
            <img src={Arrow} className="arrowSign" alt="arrowSign" />
            Disclaimers
          </h4>
          {open && (
            <div className="footerDisclaimerBox">
              {disclaimersInfo &&
                disclaimersInfo.map((item: any) => (
                  <p key={item} className="body2">
                    {item}
                  </p>
                ))}
              <p className="body2">
                Fuel cost per litre {compareData.input.fuelPrice}
              </p>
              <p className="body2">
                KM's driven {compareData.input.kmsPerYear}
              </p>
              <p className="body2">
                I want to compare {selectedModel.lineName}
              </p>
              <p className="body2">
                Estimated fuel cost saving per year{" "}
                {compareData.savingData.fuelPrice}
              </p>
              <p className="body2">
                Estimated CO2 emissions per year {compareData.savingData.co2}
              </p>
              <p className="body2">
                Estimated extra km's per year{" "}
                {compareData.savingData.travelledDistance}
              </p>
              <p className="body2">
                Estimated fuel cost per year {compareData.comparsion.fuelPrice}
              </p>
              <p className="body2">
                Estimated CO2 emissions per year {compareData.comparsion.co2}
              </p>
              <p className="body2">
                Edtimated KM's driven per year{" "}
                {compareData.comparsion.travelledDistance}
              </p>
            </div>
          )}
        </div>
      )}
    </footer>
  );
}
