import { html, LitElement } from "lit"; // Import LitElement and html from the lit library
import { property } from "lit/decorators.js"; // Import the property decorator
import "src/templates/a11y-bar-panel"; // Import custom element a11y-bar-panel
import { A11yBarPanelElement } from "src/templates/a11y-bar-panel"; // Import the type for a11y-bar-panel
import { FontFamilySettings } from "./types"; // Import the type for FontFamilySettings
import { generateDynamicCSS } from "src/utils"; // Import the generateDynamicCSS function
import { saveSelectionsLocally, getSavedSelections } from "src/local-storage"; // Import functions for saving and retrieving selections from local storage

class FontFamilyModule extends LitElement {
  @property({ type: Object })
  settings!: FontFamilySettings; // Property to store settings object of type FontFamilySettings

  @property({ type: String })
  saveAs!: string; // Property to store the key for saving settings

  @property({ type: String })
  parentId!: string; // Property to store the parent ID

  @property({ type: String })
  currentFontFamily: string = "Default"; // Property to store the current font family with a default value

  private availableFontFamilies: string[]; // Private property to store available font families

  private default: string = "Default"; // Private property to store the default font family

  private panel!: A11yBarPanelElement; // Private property to store the reference to the a11y-bar-panel element

  constructor() {
    super(); // Call the constructor of the parent class
    this.availableFontFamilies = []; // Initialize availableFontFamilies as an empty array
    this.reset = this.reset.bind(this); // Bind the reset method to the current instance
    this.addResetListener(); // Add the reset event listener
  }

  createRenderRoot() {
    return this; // Disable shadow DOM
  }

  addResetListener() {
    window.addEventListener("reset-settings", () => this.reset()); // Add an event listener to call the reset method when reset-settings event is triggered
  }

  reset() {
    this.currentFontFamily = this.default; // Reset the current font family to default
    this.updateFontFamilySettings(this.default); // Update the font family settings to default

    // Ensure the panel's current selection is updated
    if (this.panel) {
      this.panel.currentSelection = this.currentFontFamily; 
    }
  }

  // Arrow function so that 'this' refers to the proper context after being called from the panel
  updateFontFamilySettings = (option: string, save: boolean = true) => {
    // Update the font family setting
    document.documentElement.setAttribute("data-a11y-font-family", option); // Set the data-a11y-font-family attribute on the document element
    this.currentFontFamily = option; // Update the current font family
    if (this.panel) this.panel.currentSelection = this.currentFontFamily; // Update the current selection in the panel
    // Save the font family locally if save is true
    if (save) saveSelectionsLocally("fontFamily", option, this.saveAs); // Save the selection locally
  };

  firstUpdated() {
    // Called when the element is first updated
    this.panel = document.createElement(
      "a11y-bar-panel"
    ) as A11yBarPanelElement; // Create the a11y-bar-panel element
    this.panel.setAttribute("id", "a11y-bar-font-family-panel"); // Set the id attribute of the panel
    document.body.appendChild(this.panel); // Append the panel to the document body
  }

  disconnectedCallback() {
    // Called when the element is disconnected from the DOM
    super.disconnectedCallback(); // Call the disconnectedCallback of the parent class
    window.removeEventListener("reset-settings", this.reset); // Remove the reset event listener
    if (this.panel && this.panel.parentElement) {
      this.panel.parentElement.removeChild(this.panel); // Remove the panel from the DOM if it exists
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    // Called when properties are updated
    if (changedProperties.has("settings")) {
      // Check if settings property has changed
      generateDynamicCSS(this.settings as FontFamilySettings, "font-family"); // Generate dynamic CSS for font family

      this.availableFontFamilies =
        this.settings.options?.map((option) => option.label) ?? []; // Map the options to availableFontFamilies
      this.default = this.settings.default?.label ?? "Default"; // Set the default font family

      // Check if the current font family is saved locally
      const savedFontFamily = getSavedSelections(this.saveAs, "fontFamily");
      this.currentFontFamily = savedFontFamily ?? this.default; // Set the current font family to saved value or default
      this.updateFontFamilySettings(this.currentFontFamily, false); // Update the font family settings without saving

      if (this.settings.imports) {
        // If there are font imports in settings
        // If styles already applied, remove them
        const existingStyles = document.getElementById(
          `a11y-dynamic-styles-font-imports`
        );
        if (existingStyles) {
          existingStyles.remove(); // Remove existing styles if they exist
        }
        const styleElement = document.createElement("style"); // Create a new style element
        styleElement.id = `a11y-dynamic-styles-font-imports`; // Set the id for the style element

        let cssText = "";
        this.settings.imports.forEach((item) => {
          cssText += item; // Concatenate all the CSS imports
        });
        styleElement.textContent = cssText; // Set the text content of the style element to the concatenated CSS
        document.head.appendChild(styleElement); // Append the style element to the document head
      }

      this.updatePanelOptions(); // Update the options in the panel
    }
  }

  updatePanelOptions() {
    // Update the options in the panel
    if (this.panel) {
      this.panel.options = this.settings.options!; // Set the options of the panel
      this.panel.label = "Select a font family"; // Set the label of the panel
      this.panel.action = this.updateFontFamilySettings; // Set the action for the panel
      this.panel.currentSelection = this.currentFontFamily; // Set the current selection in the panel
      this.panel.triggerId = "a11y-font-family-trigger"; // Set the trigger ID for the panel
      this.panel.parentId = this.parentId; // Set the parent ID for the panel
      this.panel.type = "font-family"; // Set the type of the panel
    }
  }

  handleButtonClick = () => {
    // Handle the button click event
    this.panel.open ? this.panel.hidePanel() : this.panel.showPanel(this.currentFontFamily); // Toggle the panel visibility
  };

  render() {
    return html`
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

customElements.define("font-family-module", FontFamilyModule);

export const fontFamily = (
  settings: FontFamilySettings,
  saveAs: string,
  id: string
) => html`
  <font-family-module
    .settings="${settings}"
    .saveAs="${saveAs}"
    .parentId="${id}"
  ></font-family-module>
`;
