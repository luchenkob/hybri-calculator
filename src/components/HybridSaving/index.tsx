import React, { ReactNode, useEffect, useState } from "react";

function HybridSavingItem({
  title,
  value
}: {
  title?: ReactNode;
  value?: ReactNode;
}) {
  return (
    <div className="hybridSavingItem">
      <p className="overlineText">{title}&nbsp;</p>
      {value}
    </div>
  );
}

function CompareTable({ compareData }: { compareData: any }) {
  return (
    <div className="compareTableContainer">
      <div>
        <h3 className="underline">Comparison vehicle</h3>
        <HybridSavingItem
          title={<>Estimated Fuel Cost Per Year</>}
          value={<h3>${compareData.comparsion.fuelPrice}</h3>}
        />
        <HybridSavingItem
          title={
            <>
              Estimated CO<sub>2</sub> Emissions Per Year
            </>
          }
          value={<h3>{compareData.comparsion.co2} Tonnes</h3>}
        />
        <HybridSavingItem
          title={<>Estimated KM'S Driven Per Year</>}
          value={<h3>{compareData.comparsion.travelledDistance}km</h3>}
        />
      </div>
      <div>
        <h3 className="underline">Hybrid vehicle</h3>
        <HybridSavingItem value={<h3>${compareData.hybrid.fuelPrice}</h3>} />
        <HybridSavingItem value={<h3>{compareData.hybrid.co2} Tonnes</h3>} />
        <HybridSavingItem
          value={<h3>{compareData.hybrid.travelledDistance}km</h3>}
        />
      </div>
    </div>
  );
}

interface AnimationText {
  text: string;
  isDataChanged: boolean;
}
const AnimationText = ({ text, isDataChanged }: AnimationText) => {
  return (
    <span className={isDataChanged ? "animationText active" : "animationText"}>
      {!isDataChanged && text}
    </span>
  );
};
export function HybridSaving({ compareData }: { compareData: any }) {
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    setIsDataChanged(true);
    setTimeout(() => {
      setIsDataChanged(false);
    }, 500);
  }, [compareData]);

  return (
    <>
      {compareData && (
        <div className="hybridSavingSection">
          <div className="hybridSavingContainer ">
            <h3 className="underline">Your Hybrid saving</h3>
            <HybridSavingItem
              title={<>Estimated Fuel Saving Per Year</>}
              value={
                <p className="caculationText">
                  Saving $
                  <AnimationText
                    isDataChanged={isDataChanged}
                    text={compareData.savingData.fuelPrice}
                  />
                </p>
              }
            />
            <HybridSavingItem
              title={
                <>
                  Estimated CO<sub>2</sub> Emissions Per Year
                </>
              }
              value={
                <p className="caculationText">
                  <AnimationText
                    isDataChanged={isDataChanged}
                    text={compareData.savingData.co2}
                  />{" "}
                  tonnes less
                </p>
              }
            />
            <HybridSavingItem
              title={<>Estimated Extra KM'S Per Year</>}
              value={
                <p className="caculationText ">
                  Travel{" "}
                  <AnimationText
                    isDataChanged={isDataChanged}
                    text={compareData.savingData.travelledDistance}
                  />{" "}
                  km further
                </p>
              }
            />
          </div>
          <CompareTable compareData={compareData} />
        </div>
      )}
    </>
  );
}
