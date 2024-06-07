import { __decorate, __metadata } from "tslib";
// Importing necessary modules from 'lit' and 'lit/decorators.js'
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { generateDynamicCSS } from "src/utils";
import { saveSelectionsLocally, getSavedSelections } from "src/local-storage";
// Represents a module for managing font sizes in the application
class FontSizeModule extends LitElement {
    // Constructor to initialize properties
    constructor() {
        super(); // Call the constructor of the parent class
        this.currentFontSize = "Default"; // Property to store the current font size with a default value
        this.default = "Default"; // Private property to store the default font size
        // Method to cycle through font size options
        this.cycleFontSize = () => {
            const currentIndex = this.availableFontSizes.indexOf(this.currentFontSize); // Get the current index of the font size
            const nextIndex = (currentIndex + 1) % this.availableFontSizes.length; // Calculate the next index, cycling back to the start if at the end
            const nextFontSize = this.availableFontSizes[nextIndex]; // Get the label of the next font size
            this.currentFontSize = nextFontSize; // Update the current font size
            this.updateFontSizeSetting(nextFontSize); // Call the update function to change the font size setting
        };
        this.reset = this.reset.bind(this); // Bind the reset method to the current instance
        this.availableFontSizes = []; // Initialize availableFontSizes as an empty array
        this.addResetListener(); // Add the reset event listener
    }
    // Called when the element is disconnected from the DOM
    disconnectedCallback() {
        super.disconnectedCallback(); // Call the disconnectedCallback of the parent class
        window.removeEventListener("reset-settings", this.reset); // Remove the reset event listener
    }
    // Override to disable shadow DOM
    createRenderRoot() {
        return this; // Disable shadow DOM
    }
    // Lifecycle method called when properties change
    updated(changedProperties) {
        var _a, _b, _c, _d;
        if (changedProperties.has("settings")) {
            // If 'settings' property changed, update available font sizes and default value
            generateDynamicCSS(this.settings, "font-size"); // Generate dynamic CSS for font size
            this.availableFontSizes = (_b = (_a = this.settings.options) === null || _a === void 0 ? void 0 : _a.map((option) => option.label)) !== null && _b !== void 0 ? _b : []; // Map the options to availableFontSizes
            this.default = (_d = (_c = this.settings.default) === null || _c === void 0 ? void 0 : _c.label) !== null && _d !== void 0 ? _d : "Default"; // Set the default font size
            // Check if the current font size is saved locally
            const savedFontSize = getSavedSelections(this.saveAs, "fontSize");
            this.currentFontSize = savedFontSize !== null && savedFontSize !== void 0 ? savedFontSize : this.default; // Set the current font size to saved value or default
            this.updateFontSizeSetting(this.currentFontSize, false); // Update the font size settings without saving
        }
    }
    // Add an event listener for resetting settings
    addResetListener() {
        window.addEventListener("reset-settings", () => this.reset());
    }
    // Reset the current font size to the default value
    reset() {
        this.currentFontSize = this.default; // Reset the current font size to default
        this.updateFontSizeSetting(this.default); // Update the font size settings to default
    }
    // Update the font size setting
    updateFontSizeSetting(option, save = true) {
        document.documentElement.setAttribute("data-a11y-font-size", option); // Set the data-a11y-font-size attribute on the document element
        if (save)
            saveSelectionsLocally("fontSize", option, this.saveAs); // Save the selection locally if save is true
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
    property({ type: String }),
    __metadata("design:type", String)
], FontSizeModule.prototype, "saveAs", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], FontSizeModule.prototype, "parentId", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", String)
], FontSizeModule.prototype, "currentFontSize", void 0);
// Define the custom element
customElements.define("font-size-module", FontSizeModule);
// Function to render the font size module
export const fontSize = (settings, saveAs, id) => html `
  <font-size-module
    .settings="${settings}"
    .saveAs="${saveAs}"
    .parentId="${id}"
  ></font-size-module>
`;
//# sourceMappingURL=index.js.map