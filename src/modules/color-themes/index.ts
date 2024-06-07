import { html, LitElement } from "lit"; // Import LitElement and html from the lit library
import { property } from "lit/decorators.js"; // Import the property decorator
import "src/templates/a11y-bar-panel"; // Import custom element a11y-bar-panel
import { A11yBarPanelElement } from "src/templates/a11y-bar-panel"; // Import the type for a11y-bar-panel
import { ColorThemeSettings } from "./types"; // Import the type for ColorThemeSettings
import { generateDynamicCSS } from "src/utils"; // Import the generateDynamicCSS function
import { saveSelectionsLocally, getSavedSelections } from "src/local-storage"; // Import functions for saving and retrieving selections from local storage

class ColorThemeModule extends LitElement {
  @property({ type: Object })
  settings!: ColorThemeSettings; // Property to store settings object of type ColorThemeSettings

  @property({ type: Object })
  saveAs!: string; // Property to store the key for saving settings

  @property({ type: String })
  currentTheme: string = "Default"; // Property to store the current theme with a default value

  @property({ type: String })
  parentId!: string; // Property to store the parent ID

  private availableThemes: string[]; // Private property to store available themes

  private default: string = "Default"; // Private property to store the default theme

  private panel!: A11yBarPanelElement; // Private property to store the reference to the a11y-bar-panel element

  constructor() {
    super(); // Call the constructor of the parent class
    this.availableThemes = []; // Initialize availableThemes as an empty array
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
    this.currentTheme = this.default; // Reset the current theme to default
    this.updateColorThemeSettings(this.default); // Update the theme settings to default

    // Ensure the panel's current selection is updated
    if (this.panel) {
      this.panel.currentSelection = this.default;
    }
  }

  // Arrow function so that 'this' refers to the proper context after being called from the panel
  updateColorThemeSettings = (option: string, save: boolean = true) => {
    // Update the theme setting
    document.documentElement.setAttribute("data-a11y-color-theme", option); // Set the data-a11y-theme attribute on the document element
    this.currentTheme = option; // Update the current theme
    if (this.panel) this.panel.currentSelection = this.currentTheme; // Update the current selection in the panel
    // Save the themelocally if save is true
    if (save) saveSelectionsLocally("colorTheme", option, this.saveAs); // Save the selection locally
  }

  firstUpdated() {
    // Called when the element is first updated
    this.panel = document.createElement(
      "a11y-bar-panel"
    ) as A11yBarPanelElement; // Create the a11y-bar-panel element
    this.panel.setAttribute("id", "a11y-bar-color-theme-panel"); // Set the id attribute of the panel
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
      generateDynamicCSS(this.settings as ColorThemeSettings, "color-theme"); // Generate dynamic CSS for theme

      this.availableThemes =
        this.settings.options?.map((option) => option.label) ?? []; // Map the options to availableThemes
      this.default = this.settings.default?.label ?? "Default"; // Set the default theme

      // Check if the current theme is saved locally
      const savedTheme = getSavedSelections(this.saveAs, "colorTheme");
      this.currentTheme = savedTheme ?? this.default; // Set the current theme to saved value or default
      this.updateColorThemeSettings(this.currentTheme, false); // Update the theme settings without saving

      this.updatePanelOptions(); // Update the options in the panel
    }
  }

  updatePanelOptions() {
    // Update the options in the panel
    if (this.panel) {
      this.panel.options = this.settings.options!; // Set the options of the panel
      this.panel.label = "Select a theme"; // Set the label of the panel
      this.panel.action = this.updateColorThemeSettings; // Set the action for the panel
      this.panel.currentSelection = this.currentTheme; // Set the current selection in the panel
      this.panel.triggerId = "a11y-color-theme-trigger"; // Set the trigger ID for the panel
      this.panel.type = "color-theme"; // Set the type of the panel
      this.panel.parentId = this.parentId; // Set the parent ID for the panel
    }
  }

  handleButtonClick = () => {
    // Handle the button click event
    this.panel.open ? this.panel.hidePanel() : this.panel.showPanel(this.currentTheme); // Toggle the panel visibility
  };

  render() {
    return html`
      <li role="none">
        <button
          type="button"
          @click="${this.handleButtonClick}"
          style="flex-direction: column;"
          id="a11y-color-theme-trigger"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="a11y-bar-color-theme-panel"
          class="usa-button padding-y-105 gap-1 padding-x-05 usa-button--unstyled width-full ${this
            .currentTheme !== this.default
            ? "bg-a11y-active"
            : ""}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style="--usa-button-icon-size:var(--usa-spacing-4);fill:none"
            viewBox="0 0 24 24"
            stroke-width="1.75"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"
            />
            <path
              d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"
            />
            <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12" />
            <path d="M17 17l0 .01" />
          </svg>
          Theme
        </button>
      </li>
    `;
  }
}

customElements.define("color-theme-module", ColorThemeModule);

export const colorTheme = (
  settings: ColorThemeSettings,
  saveAs: string,
  id: string
) => html`
  <color-theme-module
    .settings="${settings}"
    .saveAs="${saveAs}"
    .parentId="${id}"
  ></color-theme-module>
`;
