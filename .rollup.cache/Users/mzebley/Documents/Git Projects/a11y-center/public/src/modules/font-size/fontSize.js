import { __decorate, __metadata } from "tslib";
// Importing necessary modules from 'lit' and 'lit/decorators.js'
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { generateDynamicCSS } from "src/utils";
import { saveSelectionsLocally, getSavedSelections } from "src/local-storage";
/**
 * Represents a module for managing font sizes in the application.
 */
class FontSizeModule extends LitElement {
    // Constructor to initialize properties
    constructor() {
        super();
        this.currentFontSize = "Default";
        this.default = "Default";
        // Method to cycle through font size options
        this.cycleFontSize = () => {
            // Get the current index of the font size
            const currentIndex = this.availableFontSizes.indexOf(this.currentFontSize);
            // Calculate the next index, cycling back to the start if at the end
            const nextIndex = (currentIndex + 1) % this.availableFontSizes.length;
            // Get the label of the next font size
            const nextFontSize = this.availableFontSizes[nextIndex];
            // Update the current font size
            this.currentFontSize = nextFontSize;
            // Call the update function passed in to change the font size setting
            this.updateFontSizeSetting(nextFontSize);
        };
        this.reset = this.reset.bind(this);
        this.availableFontSizes = [];
        this.addResetListener();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("reset-settings", this.reset);
    }
    // Override to disable shadow DOM
    createRenderRoot() {
        return this;
    }
    // Lifecycle method called when properties change
    updated(changedProperties) {
        var _a, _b, _c, _d;
        if (changedProperties.has("settings")) {
            generateDynamicCSS(this.settings, "font-size");
            // If 'settings' property changed, update available font sizes and default value
            this.availableFontSizes =
                (_b = (_a = this.settings.options) === null || _a === void 0 ? void 0 : _a.map((option) => option.label)) !== null && _b !== void 0 ? _b : [];
            this.default = (_d = (_c = this.settings.default) === null || _c === void 0 ? void 0 : _c.label) !== null && _d !== void 0 ? _d : "Default";
            // Check if the current font size is saved locally
            const savedFontSize = getSavedSelections(this.saveAs, "fontSize");
            this.currentFontSize = savedFontSize !== null && savedFontSize !== void 0 ? savedFontSize : this.default;
            this.updateFontSizeSetting(this.currentFontSize, false);
        }
    }
    addResetListener() {
        window.addEventListener("reset-settings", () => this.reset());
    }
    reset() {
        this.currentFontSize = this.default;
        this.updateFontSizeSetting(this.default);
    }
    updateFontSizeSetting(option, save = true) {
        // Update the font size setting
        document.documentElement.setAttribute("data-a11y-font-size", option);
        // Save the font size locally
        if (save)
            saveSelectionsLocally("fontSize", option, this.saveAs);
    }
    // Render method for the component
    render() {
        var _a, _b, _c;
        return html `
      <li role="none">
        <button
          type="button"
          @click="${this.cycleFontSize}"
          style="flex-direction: column;"
          class="usa-button padding-y-105 gap-05 padding-x-05 usa-button--unstyled width-full ${this
            .currentFontSize !== this.default
            ? "bg-a11y-active"
            : ""}"
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
          ${(_c = (_b = (_a = this.settings.options) === null || _a === void 0 ? void 0 : _a.find((option) => option.label === this.currentFontSize)) === null || _b === void 0 ? void 0 : _b.label) !== null && _c !== void 0 ? _c : "Text Size"}
        </button>
      </li>
    `;
    }
}
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], FontSizeModule.prototype, "settings", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", String)
], FontSizeModule.prototype, "saveAs", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", String)
], FontSizeModule.prototype, "currentFontSize", void 0);
// Define the custom element
customElements.define("font-size-module", FontSizeModule);
// Function to render the font size module
export const fontSize = (settings, saveAs) => html `
  <font-size-module
    .settings="${settings}"
    .saveAs="${saveAs}"
  ></font-size-module>
`;
//# sourceMappingURL=fontSize.js.map