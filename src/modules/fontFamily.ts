import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { GenericOption } from "../settings/types";
import "src/templates/a11y-bar-panel";
import { A11yBarPanelElement } from "src/templates/a11y-bar-panel";

export interface FontFamilySettings {
  options?: GenericOption[];
  default?: GenericOption;
  imports?: string[];
}

const defaultFontFamilyOptions: GenericOption[] = [
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
];

const defaultFontFamilyImports: string[] = [
  "@import url('https://fonts.cdnfonts.com/css/open-dyslexic');",
  "@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap');"
];

export const defaultFontFamilySettings: FontFamilySettings = {
  options: defaultFontFamilyOptions,
  default: defaultFontFamilyOptions[0],
  imports: defaultFontFamilyImports,
};

class FontFamilyModule extends LitElement {
  @property({ type: Object })
  settings!: FontFamilySettings;

  @property({ type: String })
  currentFontFamily: string = "Default";

  @property({ type: Function })
  updateFontFamilySetting!: (option: string) => void;

  private availableFontFamilies: string[];

  private default: string = "Default";

  private panel!: A11yBarPanelElement;

  constructor() {
    super();
    this.availableFontFamilies = [];
  }

  createRenderRoot() {
    return this; // disables shadow DOM
  }

  firstUpdated() {
    this.panel = document.createElement("a11y-bar-panel") as A11yBarPanelElement;
    this.panel.setAttribute("id", "a11y-bar-font-family-panel");
    document.body.appendChild(this.panel);
  }


  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.panel && this.panel.parentElement) {
      this.panel.parentElement.removeChild(this.panel);
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("settings")) {
      this.availableFontFamilies =
        this.settings.options?.map((option) => option.label) ?? [];
      this.default = this.settings.default?.label ?? "Default";
      if (this.settings.imports) {
        // If styles already applied, remove them
        const existingStyles = document.getElementById(
          `a11y-dynamic-styles-font-imports`
        );
        if (existingStyles) {
          existingStyles.remove();
        }
        const styleElement = document.createElement("style");
        styleElement.id = `a11y-dynamic-styles-font-imports`;
        
        let cssText = "";
        this.settings.imports.forEach((item) => {
          cssText += item;
        });
        styleElement.textContent = cssText;
        document.head.appendChild(styleElement);
      }

      this.updatePanelOptions();
    }
    if (changedProperties.has("currentFontFamily")) {
      this.requestUpdate();
    }
  }

  
  updatePanelOptions() {
    if (this.panel) {
      this.panel.options = this.settings.options!;
      this.panel.currentSelection = this.currentFontFamily;
      this.panel.label = "Choose a Font Family";
      this.panel.updateSelection = this.updateFontFamilySetting;
      this.panel.triggerId = "a11y-font-family-trigger";
      this.panel.a11yBarClass = ".a11y-bar";
    }
  }


  handleButtonClick = () => {
    this.panel.open ? this.panel.hidePanel() : this.panel.showPanel();
    console.log(this.panel.open);
  };

  render() {
    return html`
      <li role="none">
        <button
          type="button"
          @click="${this.handleButtonClick}"
          style="flex-direction: column;"
          id="a11y-font-family-trigger"
          role="menuitem"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="a11y-bar-font-family-panel"
          class="usa-button padding-y-105 gap-1 padding-x-05 usa-button--unstyled width-full ${this
            .currentFontFamily !== this.default
            ? "bg-a11y-active"
            : ""}"
          aria-label="Font family set to ${this.currentFontFamily}"
        >
          <span class="text-bold font-xl"> abc </span>
          Font
        </button>
      </li>
    `;
  }
}

customElements.define("font-family-module", FontFamilyModule);

export const fontFamily = (
  settings: FontFamilySettings,
  updateFontFamilySetting: (option: string) => void,
  selection: string | null
) => html`
  <font-family-module
    .settings="${settings}"
    .updateFontFamilySetting="${updateFontFamilySetting}"
    .currentFontFamily="${selection}"
  ></font-family-module>
`;
