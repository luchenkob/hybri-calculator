import React, { ReactNode } from "react";

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

function CompareTable() {
  return (
    <div className="compareTableContainer">
      <div>
        <h3 className="underline">Comparison vehicle</h3>
        <HybridSavingItem
          title={<>Estimated Fuel Cost Per Year</>}
          value={<h3>$3,500</h3>}
        />
        <HybridSavingItem
          title={
            <>
              Estimated CO<sub>2</sub> Emissions Per Year
            </>
          }
          value={<h3>10.2 Tonnes</h3>}
        />
        <HybridSavingItem
          title={<>Estimated KM'S Driven Per Year</>}
          value={<h3>30,000km</h3>}
        />
      </div>
      <div>
        <h3 className="underline">Hybrid vehicle</h3>
        <HybridSavingItem value={<h3>$1,500</h3>} />
        <HybridSavingItem value={<h3>5 Tonnes</h3>} />
        <HybridSavingItem value={<h3>42,000km</h3>} />
      </div>
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
          value={<p className="caculationText">Saving $2,000</p>}
        />
        <HybridSavingItem
          title={
            <>
              Estimated CO<sub>2</sub> Emissions Per Year
            </>
          }
          value={<p className="caculationText">5 tonnes less</p>}
        />
        <HybridSavingItem
          title={<>Estimated Extra KM'S Per Year</>}
          value={<p className="caculationText">Travel 12,000km further</p>}
        />
      </div>
      <CompareTable />
    </div>
  );
}
