import React, { useState, useEffect } from "react";
import { Header, Footer } from "@hybrid/layouts";
import { Contact, ComparisonSteps, HybridSaving } from "@hybrid/components";
import { useParams } from "react-router-dom";

export function Comparison() {
  const [compareData, setCompareData] = useState<any>(null);
  const [defaultParameters, setDefaultParameters] = useState<any>(null);
  const [defaultModelsOptions, setDefaultModelsOptions] = useState<any>(null);
  const [defaultComparisonValue, setDefaultComparisonValue] = useState<any>(
    null
  );
  const [defaultHybridValue, setDefaultHybridValue] = useState<any>(null);
  const [disclaimersInfo, setDisclaimersInfo] = useState<any>(null);
  const [models, setModels] = useState<any>(null);

  const [initialSelectedModelId, setInitialSelectedModelId] = useState<any>(
    null
  );

  let { id } = useParams();

  const calculateData = (
    fuelPrice: string,
    kmsPerYear: string,
    selectedComparisonVehicle: any,
    selectedHybridVehicle: any
  ) => {
    const { litresPer100Km, gramsCarbonPerKm } = selectedComparisonVehicle;
    const {
      litresPer100Km: hybridLitresPer100Km,
      gramsCarbonPerKm: hybridGramsCarbonPerKm
    } = selectedHybridVehicle;

    const data = {
      comparsion: {
        fuelPrice:
          (parseInt(fuelPrice) *
            parseInt(kmsPerYear) *
            parseInt(litresPer100Km)) /
          100,
        co2: (parseInt(gramsCarbonPerKm) * parseInt(kmsPerYear)) / 1000000,
        travelledDistance: parseInt(kmsPerYear)
      },
      hybrid: {
        fuelPrice:
          (parseInt(fuelPrice) * parseInt(kmsPerYear) * hybridLitresPer100Km) /
          100,
        co2:
          (parseInt(hybridGramsCarbonPerKm) * parseInt(kmsPerYear)) / 1000000,
        travelledDistance:
          (parseInt(litresPer100Km) / parseInt(hybridLitresPer100Km)) *
          parseInt(kmsPerYear)
      }
    };
    const saving = {
      fuelPrice: data.comparsion.fuelPrice - data.hybrid.fuelPrice,
      co2: data.comparsion.co2 - data.hybrid.co2,
      travelledDistance:
        data.hybrid.travelledDistance - data.comparsion.travelledDistance
    };

    setCompareData({ ...data, saving });
  };

  useEffect(() => {
    fetch("vehicle-data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(data => data.json())
      .then(object => {
        const { defaultParameters, models } = object;
        const defaultModelsOptions = models.map((item: any) => ({
          value: item.id,
          label: item.lineName
        }));
        const firstModelId = models[0].id;
        const initialSelectedModelId = id ? id : firstModelId;
        const disclaimersInfo = models.filter(
          (item: any) => item.id === initialSelectedModelId
        )[0].disclaimers;

        setDisclaimersInfo(disclaimersInfo);
        setModels(models);
        setInitialSelectedModelId(initialSelectedModelId);
        setDefaultParameters(defaultParameters);
        setDefaultModelsOptions(defaultModelsOptions);

        setDefaultComparisonValue(models[0].comparison[0].materialCode);
        setDefaultHybridValue(models[0].hybrid[0]);

        calculateData(
          defaultParameters.fuelPrice,
          defaultParameters.kmsPerYear,
          models[0].comparison[0],
          models[0].hybrid[0]
        );
      });
  }, []);

  const updateData = (data: any) => {
    const { selectedModel } = data;
    const disclaimersInfo = models.filter(
      (item: any) => item.id === selectedModel
    )[0].disclaimers;
    setDisclaimersInfo(disclaimersInfo);
    setCompareData(data);
  };

  return (
    <div>
      <Header />
      {defaultModelsOptions && (
        <>
          <ComparisonSteps
            initialSelectedModel={initialSelectedModelId}
            models={models}
            defaultParameters={defaultParameters}
            defaultModelsOptions={defaultModelsOptions}
            onChange={updateData}
            defaultComparisonValue={defaultComparisonValue}
            defaultHybridValue={defaultHybridValue}
          />
          <HybridSaving compareData={compareData} />
          <Contact />
          <Footer disclaimersInfo={disclaimersInfo} />
        </>
      )}
    </div>
  );
}
