import React, { ReactNode } from "react";

function HybridSavingItem({
  title,
  value
}: {
  title: ReactNode;
  value: string;
}) {
  return (
    <div className="hybridSavingItem">
      <p className="overlineText">{title}</p>
      <p className="caculationText">{value}</p>
    </div>
  );
}

export function HybridSaving() {
  return (
    <div className="hybridSavingSection">
      <div className="hybridSavingContainer ">
        <h3 className="underline">Your Hybrid saving</h3>
        <HybridSavingItem
          title={<>Estimated Fuel Saving Per Year</>}
          value="Saving $2,000"
        />
        <HybridSavingItem
          title={
            <>
              Estimated CO<sub>2</sub> Emissions Per Year
            </>
          }
          value="5 tonnes less"
        />
        <HybridSavingItem
          title={<>Estimated Extra KM'S Per Year</>}
          value="Travel 12,000km further"
        />
      </div>
    </div>
  );
}
