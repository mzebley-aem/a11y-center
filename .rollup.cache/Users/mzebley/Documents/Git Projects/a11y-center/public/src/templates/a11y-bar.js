// a11y-bar.ts
import { html } from "lit";
import { fontSize } from "../modules/fontSize";
import { fontFamily } from "../modules/fontFamily";
// import { fontFamily } from "./modules/fontFamily";
export const a11yBar = (closeFunction, settings, selections, updateFontSizeSetting, updateFontFamilySetting, resetSettings) => {
    var _a, _b;
    return html `
  <button
    @click="${closeFunction}"
    aria-label="Close Accessibility Center"
    type="button"
    style="flex-direction: column;top:var(--usa-spacing-1)"
    class="usa-button padding-1 usa-button--unstyled "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-x"
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
    ${settings.fontSize
        ? fontSize(settings.fontSize, updateFontSizeSetting, (_a = selections.fontSize) !== null && _a !== void 0 ? _a : null)
        : ""}
    ${settings.fontFamily
        ? fontFamily(settings.fontFamily, updateFontFamilySetting, (_b = selections.fontFamily) !== null && _b !== void 0 ? _b : null)
        : ""}
  </ul>
  <button
  @click="${resetSettings}"
    type="button"
    style="flex-direction: column;"
    class="usa-button padding-y-105 padding-x-205 usa-button--unstyled width-full"
  >
    Reset
  </button>
`;
};
//# sourceMappingURL=a11y-bar.js.map