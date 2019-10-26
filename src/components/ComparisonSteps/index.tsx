import React, { ReactNode, useState, useEffect } from "react";
import { Input, Select } from "@hybrid/components";
import Car1 from "../../assets/images/car1.png";
import Car2 from "../../assets/images/car2.png";

const tranformSubModelToOptions = (options: any) => {
  return options.map((item: any) => ({
    value: item.materialCode,
    label: item.grade
  }));
};
function ComparisonStep({
  index,
  children
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <div className="comparisonStep">
      <p className="overlineText text-center">Step {index}</p>
      {children}
    </div>
  );
}

export function ComparisonSteps({
  onChange,
  defaultParameters,
  defaultModelsOptions,
  defaultHybridValue,
  defaultComparisonValue,
  models,
  initialSelectedModel
}: {
  onChange: (data: any) => void;
  defaultParameters: any;
  defaultModelsOptions: any;
  defaultHybridValue: string;
  defaultComparisonValue: string;
  models: any;
  initialSelectedModel?: string;
}) {
  const [fuelPrice, setFuelPrice] = useState<string>(
    defaultParameters.fuelPrice
  );
  const [kmsPerYear, setKmsPerYear] = useState<string>(
    defaultParameters.kmsPerYear
  );
  const [modelOptions, setModelOptions] = useState(defaultModelsOptions);
  const [comparisonOptions, setComparisonOptions] = useState<any>([]);
  const [hybridOptions, setHybridOptions] = useState<any>([]);
  const [selectedComparisonVehicle, setSelectedComparisonVehicle] = useState<
    any
  >({
    materialCode: null
  });
  const [
    selectedComparisonVehicleValue,
    setSelectedComparisonVehicleValue
  ] = useState<any>(defaultComparisonValue);

  const [selectedHybridVehicleValue, setSelectedHybridVehicleValue] = useState<
    any
  >(defaultHybridValue);

  const [selectedHybridVehicle, setSelectedHybridVehicle] = useState<any>({
    materialCode: null
  });
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    initialSelectedModel
  );
  const [selectedModelObject, setSelectedModelObject] = useState<any>(null);

  useEffect(() => {
    const modelList = models.filter(
      (item: any) => item.id === initialSelectedModel
    );
    setSelectedModelObject(modelList[0]);
    setComparisonOptions(tranformSubModelToOptions(modelList[0].comparison));
    setHybridOptions(tranformSubModelToOptions(modelList[0].hybrid));

    setSelectedComparisonVehicleValue(modelList[0].comparison[0].materialCode);
    setSelectedHybridVehicleValue(modelList[0].hybrid[0].materialCode);
  }, []);

  useEffect(() => {
    if (selectedModelObject) {
      setSelectedComparisonVehicleValue(
        selectedModelObject.comparison[0].materialCode
      );
      setSelectedHybridVehicleValue(selectedModelObject.hybrid[0].materialCode);

      setSelectedComparisonVehicle(selectedModelObject.comparison[0]);
      setSelectedHybridVehicle(selectedModelObject.hybrid[0]);
    }
  }, [selectedModel]);

  const changeModel = (value: string) => {
    const modelList = models.filter((item: any) => item.id === value);
    if (modelList.length > 0) {
      setComparisonOptions(tranformSubModelToOptions(modelList[0].comparison));
      setHybridOptions(tranformSubModelToOptions(modelList[0].hybrid));
      setSelectedModel(value);
      setSelectedModelObject(modelList[0]);
    }
  };

  const handleComparisonChange = (value: any) => {
    const comparisonList = selectedModelObject.comparison.filter(
      (item: any) => item.grade === value
    );
    if (comparisonList.length > 0) {
      setSelectedComparisonVehicle(comparisonList[0]);
    }
  };
  const handleHybridChange = (value: any) => {
    const hybridList = selectedModelObject.hybrid.filter(
      (item: any) => item.grade === value
    );
    if (hybridList.length > 0) {
      setSelectedHybridVehicle(hybridList[0]);
    }
  };

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
    onChange({ ...data, saving, selectedModel });
  };

  const runCalculateData = () => {
    if (
      fuelPrice &&
      kmsPerYear &&
      selectedComparisonVehicle.grade &&
      selectedHybridVehicle.grade
    ) {
      calculateData(
        fuelPrice,
        kmsPerYear,
        selectedComparisonVehicle,
        selectedHybridVehicle
      );
    }
  };

  useEffect(() => {
    runCalculateData();
  }, [selectedComparisonVehicle, selectedHybridVehicle, fuelPrice, kmsPerYear]);

  return (
    <div className="ComparisonStepsSection">
      <ComparisonStep index={1}>
        <p className="body1 text-center no-margin">
          Personalise your driving information to estimate your hybrid saving
        </p>
        <div className="text-center">
          <div className="inputGroup">
            <p className="body1 no-margin">
              <label>Fuel cost per litre </label>
              <Input
                onChange={setFuelPrice}
                value={fuelPrice}
                currency
                suffix="[3]"
              />
            </p>
          </div>
          <div className="inputGroup">
            <p className="body1 no-margin">
              <label>Km's driven per year: </label>
              <Input onChange={setKmsPerYear} value={kmsPerYear} suffix="[4]" />
            </p>
          </div>
        </div>
      </ComparisonStep>
      <ComparisonStep index={2}>
        <div className="carComparisionArea text-center">
          <span className="body1">I want to compare </span>
          <div className="compareVehicle">
            <Select
              options={modelOptions}
              value={selectedModel}
              onChange={changeModel}
            />
          </div>
          <span className="body1">vehicles</span>
        </div>
        <div className="text-center">
          <div className="inputGroup">
            <p className="captionText">Comparison vehicle</p>
            <div className="comparisonVehicle">
              <Select
                className="comparisonVehicleDropdown"
                options={comparisonOptions}
                value={selectedComparisonVehicleValue}
                onChange={handleComparisonChange}
              />
            </div>
          </div>
          <div className="inputGroup">
            <p className="captionText">Hybrid vehicle </p>
            <div className="comparisonVehicle">
              <Select
                className="comparisonVehicleDropdown"
                options={hybridOptions}
                value={selectedHybridVehicleValue}
                onChange={handleHybridChange}
              />
            </div>
          </div>
        </div>

        <div className="carPictureContainer">
          <div className="carPicture left">
            <img src={Car2} />
          </div>
          <div className="carPicture right">
            <img src={Car1} />
          </div>
          <div className="hiddenContainer">
            <img src={Car2} />
          </div>
        </div>
      </ComparisonStep>
    </div>
  );
}
