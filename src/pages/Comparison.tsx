import React, { useState, useEffect } from "react";
import { Header, Footer } from "@hybrid/layouts";
import { Contact, ComparisonSteps, HybridSaving } from "@hybrid/components";

function getURLParam(name :any){
    // eslint-disable-next-line
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null){
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
}

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

  let id = getURLParam("modelId");

  useEffect(() => {
    const fetchModelId = (id: any) => {
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
          const fallbackId = defaultParameters.fallbackId;
          const listModelMatchParamId = models.filter(
            (item: any) => item.id === id
          );

          const initialSelectedModelId =
            listModelMatchParamId.length > 0 ? id : fallbackId;
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
        });
    };
    fetchModelId(id);
  }, [id]);

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
          <Contact modelData={compareData} />
          <Footer disclaimersInfo={disclaimersInfo} />
        </>
      )}
    </div>
  );
}
