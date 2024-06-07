import { __decorate, __metadata } from "tslib";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import "src/templates/a11y-bar-panel";
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
class FontFamilyModule extends LitElement {
    constructor() {
        super();
        this.currentFontFamily = "Default";
        this.default = "Default";
        this.handleButtonClick = () => {
            this.panel.open ? this.panel.hidePanel() : this.panel.showPanel();
        };
        this.availableFontFamilies = [];
    }
    createRenderRoot() {
        return this; // disables shadow DOM
    }
    firstUpdated() {
        this.panel = document.createElement("a11y-bar-panel");
        this.panel.setAttribute("id", "a11y-bar-font-family-panel");
        document.body.appendChild(this.panel);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.panel && this.panel.parentElement) {
            this.panel.parentElement.removeChild(this.panel);
        }
    }
    updated(changedProperties) {
        var _a, _b, _c, _d;
        if (changedProperties.has("settings")) {
            this.availableFontFamilies =
                (_b = (_a = this.settings.options) === null || _a === void 0 ? void 0 : _a.map((option) => option.label)) !== null && _b !== void 0 ? _b : [];
            this.default = (_d = (_c = this.settings.default) === null || _c === void 0 ? void 0 : _c.label) !== null && _d !== void 0 ? _d : "Default";
            if (this.settings.imports) {
                // If styles already applied, remove them
                const existingStyles = document.getElementById(`a11y-dynamic-styles-font-imports`);
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
            this.panel.options = this.settings.options;
            this.panel.currentSelection = this.currentFontFamily;
            this.panel.label = "Choose a Font Family";
            this.panel.updateSelection = this.updateFontFamilySetting;
            this.panel.triggerId = "a11y-font-family-trigger";
            this.panel.type = "font-family";
        }
    }
    render() {
        return html `
      <li role="none">
        <button
          type="button"
          @click="${this.handleButtonClick}"
          style="flex-direction: column;"
          id="a11y-font-family-trigger"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="a11y-bar-font-family-panel"
          class="usa-button padding-y-105 gap-1 padding-x-05 usa-button--unstyled width-full ${this
            .currentFontFamily !== this.default
            ? "bg-a11y-active"
            : ""}"
        >
          <span class="text-bold font-xl"> abc </span>
          Font
        </button>
      </li>
    `;
    }
}
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], FontFamilyModule.prototype, "settings", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], FontFamilyModule.prototype, "currentFontFamily", void 0);
__decorate([
    property({ type: Function }),
    __metadata("design:type", Function)
], FontFamilyModule.prototype, "updateFontFamilySetting", void 0);
customElements.define("font-family-module", FontFamilyModule);
export const fontFamily = (settings, updateFontFamilySetting, selection) => html `
  <font-family-module
    .settings="${settings}"
    .updateFontFamilySetting="${updateFontFamilySetting}"
    .currentFontFamily="${selection}"
  ></font-family-module>
`;
//# sourceMappingURL=fontFamily.js.map