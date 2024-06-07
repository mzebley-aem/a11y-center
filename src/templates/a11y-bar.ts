// a11y-bar.ts
import { html } from "lit";
import { A11ySettings } from "../settings/types";
import { fontSize } from "../modules/font-size";
import { FontSizeSettings } from "../modules/font-size/types";
import { fontFamily } from "../modules/font-family";
import { FontFamilySettings } from "../modules/font-family/types";
import { colorTheme } from "src/modules/color-themes";
import { ColorThemeSettings } from "src/modules/color-themes/types";

export const a11yBar = (
  closeFunction: () => void,
  settings: A11ySettings,
  resetSettings: () => void
) => html`
  <button
    @click="${closeFunction}"
    id="${settings.id?? 'a11y-center'}-close-button"
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
      ? colorTheme(
          settings.colorTheme as ColorThemeSettings,
          settings.saveAs ?? "a11y-center-selections",
          settings.id ?? "a11y-center"
        )
      : ""}
    ${settings.fontSize
      ? fontSize(
          settings.fontSize as FontSizeSettings,
          settings.saveAs ?? "a11y-center-selections",
          settings.id ?? "a11y-center"
        )
      : ""}
    ${settings.fontFamily
      ? fontFamily(
          settings.fontFamily as FontFamilySettings,
          settings.saveAs ?? "a11y-center-selections",
          settings.id ?? "a11y-center"
        )
      : ""}
  </ul>
  <button
    @click="${resetSettings}"
    type="button"
    id="${settings.id?? 'a11y-center'}-reset-button"
    style="flex-direction: column;"
    class="usa-button padding-y-105 padding-x-205 usa-button--unstyled width-full"
  >
    Reset
  </button>
`;
