import { GenericOption } from "../../settings/types";
import { ColorThemeSettings } from "./types";
import { cssVars as darkVars, additionalCSS as darkAdditional } from "./themes/adapt/dark";
// Default font size options
const defaultColorThemeOptions: GenericOption[] = [
  {
    label: "Default",
    values: [],
  },
  {
    label: "ADAPT - Dark",
    values: darkVars,
    additionalCSS: darkAdditional,
  },
];

// Default font size settings object
export const defaultColorThemeSettings: ColorThemeSettings = {
  options: defaultColorThemeOptions,
  default: defaultColorThemeOptions[0],
};
