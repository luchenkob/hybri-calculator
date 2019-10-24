import React, { useState, useEffect } from "react";
import { Header, Footer } from "@hybrid/layouts";
import { Contact, ComparisonSteps, HybridSaving } from "@hybrid/components";
import { useParams } from "react-router-dom";

export function Comparison() {
  const [compareData, setCompareData] = useState<any>(null);
  const [defaultParameters, setDefaultParameters] = useState<any>(null);
  const [defaultModelsOptions, setDefaultModelsOptions] = useState<any>(null);
  const [disclaimersInfo, setDisclaimersInfo] = useState<any>(null);
  const [models, setModels] = useState<any>(null);

  const [initialSelectedModelId, setInitialSelectedModelId] = useState<any>(
    null
  );

  let { id } = useParams();

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
  console.log(initialSelectedModelId);
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
          />
          <HybridSaving compareData={compareData} />
          <Contact />
          <Footer disclaimersInfo={disclaimersInfo} />
        </>
      )}
    </div>
  );
}
