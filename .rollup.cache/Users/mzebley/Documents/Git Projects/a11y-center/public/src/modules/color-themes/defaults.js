import { cssVars as darkVars, additionalCSS as darkAdditional } from "./themes/adapt/dark";
// Default font size options
const defaultColorThemeOptions = [
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
export const defaultColorThemeSettings = {
    options: defaultColorThemeOptions,
    default: defaultColorThemeOptions[0],
};
//# sourceMappingURL=defaults.js.map