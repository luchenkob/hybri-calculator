import React, { useState, useEffect } from "react";
import { Header, Footer } from "@hybrid/layouts";
import { Contact, ComparisonSteps, HybridSaving } from "@hybrid/components";
import { useParams } from "react-router-dom";
import { DefaultData } from "../assets/data/DefaultData";

const { defaultParameters, models } = DefaultData;
const defaultModelsOptions = models.map(item => ({
  value: item.id,
  label: item.lineName
}));

export function Comparison() {
  const [compareData, setCompareData] = useState<any>(null);
  //   const [selectedModel, setSelectedModel] = useState<any>(null);
  const [disclaimersInfo, setDisclaimersInfo] = useState<any>(null);
  let { id } = useParams();
  const firstModelId = models[0].id;
  const initialSelectedModelId = id ? id : firstModelId;
  useEffect(() => {
    const disclaimersInfo = models.filter(
      item => item.id === initialSelectedModelId
    )[0].disclaimers;
    setDisclaimersInfo(disclaimersInfo);
  }, []);

  const updateData = (data: any) => {
    const { selectedModel } = data;
    const disclaimersInfo = models.filter(item => item.id === selectedModel)[0]
      .disclaimers;
    setDisclaimersInfo(disclaimersInfo);
    setCompareData(data);
  };
  return (
    <div>
      <Header />
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
    </div>
  );
}
