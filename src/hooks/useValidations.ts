import { InitialValues } from "../contexts/ValuesContext";

export function useValidations(values: InitialValues) {
  const alerts = [];
  const okays = [];

  if (Number(values.termInsurancePremium) <= 0) {
    alerts.push("No term insurance");
  } else {
    okays.push("Term insurance");
  }

  if (Number(values.healthInsurancePremium) <= 0) {
    alerts.push("No health insurance");
  } else {
    okays.push("Health insurance");
  }

  const expectedEmergencyFund = Number(values.monthlyIncome) * 6;
  const currentSavings = Number(values.currentSavings);

  if (currentSavings < expectedEmergencyFund) {
    alerts.push("Insufficient emergency fund");
  } else {
    okays.push("Sufficient emergency fund");
  }

  return { alerts, okays };
}
