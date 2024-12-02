import { Preferences } from "@capacitor/preferences";

type Key = "incomeSources";

export default function () {
  async function getData(key: Key, defaultValue: any) {
    const { value } = await Preferences.get({ key });
    if (!value) return defaultValue;
    return JSON.parse(value);
  }

  async function setData(key: Key, value: any) {
    const stringified = JSON.stringify(value);
    await Preferences.set({ key, value: stringified });
  }

  return { getData, setData };
}
