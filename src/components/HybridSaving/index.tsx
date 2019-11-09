import React, { ReactNode, useEffect, useState } from "react";
import CountUp from "react-countup";

const animationDuration = 5;

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

function CompareTable({
  compareData,
  savingDataHolder
}: {
  compareData: any;
  savingDataHolder: any;
}) {
  return (
    <div className="compareTableContainer">
      <div>
        <h3 className="underline">Comparison vehicle</h3>
        <HybridSavingItem
          title={<>Estimated Fuel Cost Per Year</>}
          value={
            <h3>
              $
              <CountUp
                start={
                  savingDataHolder
                    ? Number(savingDataHolder.comparsion.fuelPrice)
                    : 0
                }
                end={Number(compareData.comparsion.fuelPrice)}
                duration={animationDuration}
                separator=","
              />
            </h3>
          }
        />
        <HybridSavingItem
          title={
            <>
              Estimated CO<sub>2</sub> Emissions Per Year
            </>
          }
          value={
            <h3>
              <CountUp
                start={
                  savingDataHolder ? Number(savingDataHolder.comparsion.co2) : 0
                }
                end={Number(compareData.comparsion.co2)}
                duration={animationDuration}
                separator=","
                decimals={2}
              />{" "}
              Tonnes
            </h3>
          }
        />
        <HybridSavingItem
          title={<>Estimated KM'S Driven Per Year</>}
          value={
            <h3>
              <CountUp
                start={
                  savingDataHolder
                    ? Number(savingDataHolder.comparsion.travelledDistance)
                    : 0
                }
                end={Number(compareData.comparsion.travelledDistance)}
                duration={animationDuration}
                separator=","
              />
              km
            </h3>
          }
        />
      </div>
      <div>
        <h3 className="underline">Hybrid vehicle</h3>
        <HybridSavingItem
          value={
            <h3>
              $
              {
                <CountUp
                  start={
                    savingDataHolder
                      ? Number(savingDataHolder.hybrid.fuelPrice)
                      : 0
                  }
                  end={parseFloat(compareData.hybrid.fuelPrice)}
                  duration={animationDuration}
                  separator=","
                />
              }
            </h3>
          }
        />
        <HybridSavingItem
          value={
            <h3>
              {
                <CountUp
                  start={
                    savingDataHolder ? Number(savingDataHolder.hybrid.co2) : 0
                  }
                  end={parseFloat(compareData.hybrid.co2)}
                  duration={animationDuration}
                  separator=","
                  decimals={2}
                />
              }{" "}
              Tonnes
            </h3>
          }
        />
        <HybridSavingItem
          value={
            <h3>
              {
                <CountUp
                  start={
                    savingDataHolder
                      ? Number(savingDataHolder.hybrid.travelledDistance)
                      : 0
                  }
                  end={parseFloat(compareData.hybrid.travelledDistance)}
                  duration={animationDuration}
                  separator=","
                />
              }
              km
            </h3>
          }
        />
      </div>
    </div>
  );
}

export function HybridSaving({ compareData }: { compareData: any }) {
  const [savingDataHolder, setSavingDataHolder] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setSavingDataHolder(compareData);
    }, animationDuration*1000);
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
                  Save $
                  <CountUp
                    start={
                      savingDataHolder
                        ? Number(savingDataHolder.savingData.fuelPrice)
                        : 0
                    }
                    end={parseFloat(compareData.savingData.fuelPrice)}
                    duration={animationDuration}
                    separator=","
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
                  <CountUp
                    start={
                      savingDataHolder
                        ? Number(savingDataHolder.savingData.co2)
                        : 0
                    }
                    end={parseFloat(compareData.savingData.co2)}
                    duration={animationDuration}
                    separator=","
                    decimals={2}
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
                  <CountUp
                    start={
                      savingDataHolder
                        ? Number(savingDataHolder.savingData.travelledDistance)
                        : 0
                    }
                    end={parseFloat(compareData.savingData.travelledDistance)}
                    duration={animationDuration}
                    separator=","
                  />
                  km further
                </p>
              }
            />
          </div>
          <CompareTable
            compareData={compareData}
            savingDataHolder={savingDataHolder}
          />
        </div>
      )}
    </>
  );
}
