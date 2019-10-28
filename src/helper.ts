export const calculateData = (
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

  const vehiclesData = {
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
      co2: (parseInt(hybridGramsCarbonPerKm) * parseInt(kmsPerYear)) / 1000000,
      travelledDistance:
        (parseInt(litresPer100Km) / parseInt(hybridLitresPer100Km)) *
        parseInt(kmsPerYear)
    }
  };
  const savingData = {
    fuelPrice:
      vehiclesData.comparsion.fuelPrice - vehiclesData.hybrid.fuelPrice,
    co2: vehiclesData.comparsion.co2 - vehiclesData.hybrid.co2,
    travelledDistance:
      vehiclesData.hybrid.travelledDistance -
      vehiclesData.comparsion.travelledDistance
  };

  return { ...vehiclesData, savingData };
};
