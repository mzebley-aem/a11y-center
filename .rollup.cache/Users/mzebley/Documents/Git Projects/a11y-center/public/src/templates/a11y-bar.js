// a11y-bar.ts
import { html } from "lit";
import { fontSize } from "../modules/font-size";
import { fontFamily } from "../modules/font-family";
import { colorTheme } from "src/modules/color-themes";
export const a11yBar = (closeFunction, settings, resetSettings) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return html `
  <button
    @click="${closeFunction}"
    id="${(_a = settings.id) !== null && _a !== void 0 ? _a : 'a11y-center'}-close-button"
    aria-label="Close Accessibility Center"
    type="button"
    style="flex-direction: column;top:var(--usa-spacing-1)"
    class="usa-button padding-1 usa-button--unstyled "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="3"
      style="width:var(--usa-spacing-3);height:var(--usa-spacing-3)"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      role="img"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
    Close
  </button>
  <ul class="content">
    ${settings.colorTheme
        ? colorTheme(settings.colorTheme, (_b = settings.saveAs) !== null && _b !== void 0 ? _b : "a11y-center-selections", (_c = settings.id) !== null && _c !== void 0 ? _c : "a11y-center")
        : ""}
    ${settings.fontSize
        ? fontSize(settings.fontSize, (_d = settings.saveAs) !== null && _d !== void 0 ? _d : "a11y-center-selections", (_e = settings.id) !== null && _e !== void 0 ? _e : "a11y-center")
        : ""}
    ${settings.fontFamily
        ? fontFamily(settings.fontFamily, (_f = settings.saveAs) !== null && _f !== void 0 ? _f : "a11y-center-selections", (_g = settings.id) !== null && _g !== void 0 ? _g : "a11y-center")
        : ""}
  </ul>
  <button
    @click="${resetSettings}"
    type="button"
    id="${(_h = settings.id) !== null && _h !== void 0 ? _h : 'a11y-center'}-reset-button"
    style="flex-direction: column;"
    class="usa-button padding-y-105 padding-x-205 usa-button--unstyled width-full"
  >
    Reset
  </button>
`;
};
//# sourceMappingURL=a11y-bar.js.map