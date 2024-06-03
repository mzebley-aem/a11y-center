import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { GenericOption } from "../settings/types";

export interface FontSizeSettings {
  options?: GenericOption[];
  default?: GenericOption;
}

const defaultFontSizeOptions: GenericOption[] = [
  {
    label: "Default",
    values: [
      { "--a11y-font-size-modifier": 1 },
      { "--a11y-line-height-modifier": 1 },
    ],
  },
  {
    label: "Large",
    values: [
      { "--a11y-font-size-modifier": 1.2 },
      { "--a11y-line-height-modifier": 1.125 },
      { "--a11y-spacing-modifier": 1.125 },
    ],
  },
  {
    label: "Larger",
    values: [
      { "--a11y-font-size-modifier": 1.4 },
      { "--a11y-line-height-modifier": 1.125 },
      { "--a11y-spacing-modifier": 1.2 },
    ],
  },
];

export const defaultFontSizeSettings: FontSizeSettings = {
  options: defaultFontSizeOptions,
  default: defaultFontSizeOptions[0],
};

class FontSizeModule extends LitElement {
  @property({ type: Object })
  settings!: FontSizeSettings;

  @property({ type: String })
  currentFontSize: string = "Default";

  @property({ type: Function })
  updateFontSizeSetting!: (option: string) => void;

  private availableFontSizes: string[];

  private default: string = "Default";

  constructor() {
    super();
    this.availableFontSizes = [];
  }

  createRenderRoot() {
    return this; // disables shadow DOM
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("settings")) {
      this.availableFontSizes =
        this.settings.options?.map((option) => option.label) ?? [];
      this.default = this.settings.default?.label ?? "Default";
    }
    if (changedProperties.has("currentFontSize")) {
      this.requestUpdate();
    }
  }

  cycleFontSize = () => {
    const currentIndex = this.availableFontSizes.indexOf(this.currentFontSize);
    const nextIndex = (currentIndex + 1) % this.availableFontSizes.length;
    const nextFontSize = this.availableFontSizes[nextIndex];
    this.currentFontSize = nextFontSize;
    this.updateFontSizeSetting(nextFontSize);
  };

  render() {
    return html`
      <li role="none">
        <button
          type="button"
          @click="${this.cycleFontSize}"
          style="flex-direction: column;"
          role="menuitem"
          class="usa-button padding-y-105 gap-05 padding-x-05 usa-button--unstyled width-full ${this
            .currentFontSize !== this.default
            ? "bg-a11y-active"
            : ""}"
          aria-label="Font size set to ${this.currentFontSize}"
        >
          <svg
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            style="--usa-button-icon-size:var(--usa-spacing-4)"
            viewBox="0 0 24 24"
            stroke-width="2.25"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7v-2h13v2" />
            <path d="M10 5v14" />
            <path d="M12 19h-4" />
            <path d="M15 13v-1h6v1" />
            <path d="M18 12v7" />
            <path d="M17 19h2" />
          </svg>
          ${this.settings.options?.find(
            (option) => option.label === this.currentFontSize
          )?.label ?? "Text Size"}
        </button>
      </li>
    `;
  }
}

customElements.define("font-size-module", FontSizeModule);

export const fontSize = (
  settings: FontSizeSettings,
  updateFontSizeSetting: (option: string) => void,
  selection: string | null
) => html`
  <font-size-module
    .settings="${settings}"
    .updateFontSizeSetting="${updateFontSizeSetting}"
    .currentFontSize="${selection}"
  ></font-size-module>
`;
