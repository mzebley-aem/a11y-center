// a11y-bar.ts
import { html } from "lit";
import { A11ySettings, A11ySelections } from "../settings/types";
import { FontSizeSettings, fontSize } from "../modules/fontSize";
import { FontFamilySettings, fontFamily } from "../modules/fontFamily";

import { a11yBarButton } from "./button";
// import { fontFamily } from "./modules/fontFamily";

export const a11yBar = (
  closeFunction: () => void,
  settings: A11ySettings,
  selections: A11ySelections,
  updateFontSizeSetting: (option: string) => void,
  updateFontFamilySetting: (option: string) => void,
  resetSettings: () => void
) => html`
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
      ? fontSize(
        settings.fontSize as FontSizeSettings, 
        updateFontSizeSetting,
        selections.fontSize?? null)
      : ""}
    ${settings.fontFamily
      ? fontFamily(
        settings.fontFamily as FontFamilySettings, 
        updateFontFamilySetting,
        selections.fontFamily?? null)
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
