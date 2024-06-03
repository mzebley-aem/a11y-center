// defaults.ts
import { A11ySettings } from "./types";
import { defaultFontSizeSettings } from "../modules/fontSize";
import { defaultFontFamilySettings } from "../modules/fontFamily";

export const defaultA11ySettings: A11ySettings = {
  saveAs: 'a11y-center-selections',
  fontSize: defaultFontSizeSettings,
  fontFamily: defaultFontFamilySettings,
  // Add more default settings as needed
};
