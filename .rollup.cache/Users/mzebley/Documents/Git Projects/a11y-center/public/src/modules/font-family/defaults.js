const defaultFontFamilyOptions = [
    {
        label: "Default",
        values: [],
    },
    {
        label: "Open Dyslexic",
        values: [
            { "--usa-font-sans": '"Open-Dyslexic", sans-serif !important' },
            { "--usa-font-serif": '"Open-Dyslexic", sans-serif !important' },
            { "--usa-font-alt": '"Open-Dyslexic", sans-serif !important' },
        ],
    },
    {
        label: "Atkinson Hyperlegible",
        values: [
            { "--usa-font-sans": '"Atkinson Hyperlegible", sans-serif !important' },
            { "--usa-font-serif": '"Atkinson Hyperlegible", sans-serif !important' },
            { "--usa-font-alt": '"Atkinson Hyperlegible", sans-serif !important' },
        ],
    },
    {
        label: "Roboto Mono",
        values: [
            { "--usa-font-sans": '"Roboto Mono", monospace !important' },
            { "--usa-font-serif": '"Roboto Mono", monospace !important' },
            { "--usa-font-alt": '"Roboto Mono", monospace !important' },
        ]
    }
];
const defaultFontFamilyImports = [
    "@import url('https://fonts.cdnfonts.com/css/open-dyslexic');",
    "@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap');",
    "@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');",
    "@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');"
];
export const defaultFontFamilySettings = {
    options: defaultFontFamilyOptions,
    default: defaultFontFamilyOptions[0],
    imports: defaultFontFamilyImports,
};
//# sourceMappingURL=defaults.js.map