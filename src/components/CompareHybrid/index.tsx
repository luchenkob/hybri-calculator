import React, { useState } from "react";
import { ComparisonSteps } from "../ComparisonSteps";
import { HybridSaving } from "../HybridSaving";

export function CompareHybrid() {
  const [compareData, setCompareData] = useState<any>(null);
  return (
    <div>
      {/* <ComparisonSteps onChange={setCompareData} />
      <HybridSaving compareData={compareData} /> */}
    </div>
  );
}
