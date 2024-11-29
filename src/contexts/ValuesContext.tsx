import { Preferences } from "@capacitor/preferences";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

const initialValues = {
  monthlyIncome: "",
  termInsurancePremium: "",
  healthInsurancePremium: "",
  currentSavings: "",
};

export type InitialValues = typeof initialValues;
export type Field = keyof InitialValues;

export const ValuesContext = createContext({
  values: initialValues,
  committed: false,
  updateValues: (_: typeof initialValues) => {},
  commitValues: async () => {},
});

export function ValuesContextProvider({ children }: PropsWithChildren) {
  const [values, setValues] = useState(initialValues);
  const [committed, setCommitted] = useState(false);

  useEffect(() => {
    (async () => {
      const values = (await Preferences.get({ key: "values" })).value;

      if (values && values.length > 0) {
        setValues(JSON.parse(values));
        setCommitted(true);
      }
    })();
  }, []);

  function updateValues(newValues: typeof initialValues) {
    setValues(newValues);
  }

  async function commitValues() {
    await Preferences.set({ key: "values", value: JSON.stringify(values) });
    setCommitted(true);
  }

  return (
    <ValuesContext.Provider
      value={{
        values,
        committed,
        updateValues,
        commitValues,
      }}
    >
      {children}
    </ValuesContext.Provider>
  );
}
