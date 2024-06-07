// defaults.ts
import { A11ySettings } from "./types";
import { defaultFontSizeSettings } from "../modules/font-size/defaults";
import { defaultFontFamilySettings } from "../modules/font-family/defaults";
import { defaultColorThemeSettings } from "../modules/color-themes/defaults";

export const defaultA11ySettings: A11ySettings = {
  saveAs: 'a11y-center-selections',
  id: 'a11y-center',
  fontSize: defaultFontSizeSettings,
  fontFamily: defaultFontFamilySettings,
  colorTheme: defaultColorThemeSettings,
  tokenURL: null
  // Add more default settings as needed
};
