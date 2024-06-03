import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./styles/index.css";
import { v4 as uuidv4 } from "uuid";

import { layout } from "./templates/layout";
import { a11yBar } from "./templates/a11y-bar";
import { defaultA11ySettings } from "./settings/defaults";
import {
  A11ySettings,
  A11ySelections,
} from "./settings/types";
import { FontSizeSettings } from "./modules/fontSize";
import { FontFamilySettings } from "./modules/fontFamily";
import { mergeSettings, generateDynamicCSS } from "./utils";

@customElement("a11y-center")
export class a11yCenter extends LitElement {
  static styles = [styles];
  private uniqueIdPrefix: string = "";
  private activeTrigger: HTMLElement | null = null;

  private selections!: A11ySelections;
  private defaultSelections!: A11ySelections;

  @property({ type: String })
  header = "Accessibility Center";

  @property({ type: Object })
  settings: A11ySettings = defaultA11ySettings;

  private mergedSettings!: A11ySettings;

  constructor() {
    super();
    this.uniqueIdPrefix = uuidv4().slice(0, 9);
    this.injectStylesheet();
    this.addTriggerListeners();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateMergedSettings();
    this.buildSelectionObj();
    this.addTriggerListeners();
    document.addEventListener("keydown", this.trapFocus);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('settings')) {
      this.updateMergedSettings();
      this.buildSelectionObj();
    }
  }

  updateMergedSettings() {
    this.mergedSettings = mergeSettings(this.settings);
    generateDynamicCSS(this.mergedSettings.fontSize as FontSizeSettings, 'font-size');
    generateDynamicCSS(this.mergedSettings.fontFamily as FontFamilySettings, 'font-family');
  }

  buildSelectionObj() {
    this.selections = {};

    // Initialize selections with default values from settings
    if (
      this.mergedSettings.fontSize &&
      typeof this.mergedSettings.fontSize !== "boolean"
    ) {
      this.selections.fontSize =
        this.mergedSettings.fontSize.default?.label ?? "";
    }

    if (
      this.mergedSettings.fontFamily &&
      typeof this.mergedSettings.fontFamily !== "boolean"
    ) {
      this.selections.fontFamily =
        this.mergedSettings.fontFamily.default?.label ?? "";
    }

    // Save default selections
    this.defaultSelections = { ...this.selections };

    // Retrieve saved selections from localStorage
    const saved = JSON.parse(
      localStorage.getItem(this.mergedSettings.saveAs ?? "a11y-center") || "{}"
    );

    // Update selections with any values from the saved object
    this.selections = { ...this.selections, ...saved };

    this.applySelections(this.selections);
  }

  resetSelections() {
    // Reset selections to default values
    this.selections = { ...this.defaultSelections };
    this.applySelections(this.selections);
    this.saveSelectionsLocally();
  }

  applySelections(selections: A11ySelections) {
    // Apply selections
    if (selections.fontSize)
      this.updateFontSizeSetting(this.selections.fontSize, false);
    if (selections.fontFamily)
      this.updateFontFamilySetting(this.selections.fontFamily, false);
  }

  injectStylesheet() {
    // Inject the stylesheet into the document head
    const stylesheet = document.createElement("style");
    stylesheet.type = "text/css";
    stylesheet.id = "a11y-center-styles";
    stylesheet.textContent = styles.toString();
    document.head.appendChild(stylesheet);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      ${layout(
        a11yBar(
          this.closeA11yCenter,
          this.mergedSettings,
          this.selections,
          this.updateFontSizeSetting,
          this.updateFontFamilySetting,
          this.resetSelections
        ),
        this.header,
        "a11y-bar open"
      )}
    `;
  }

  updateFontSizeSetting = (option: string, save: boolean = true) => {
    // Update the font size setting
    document.documentElement.setAttribute("data-a11y-font-size", option);
    this.selections.fontSize = option;
    this.requestUpdate(); // Ensure the component updates
    if (save) this.saveSelectionsLocally();
  };

  updateFontFamilySetting = (option: string, save: boolean = true) => {
    // Update the font family setting
    document.documentElement.setAttribute("data-a11y-font-family", option);
    this.selections.fontFamily = option;
    this.requestUpdate(); // Ensure the component updates
    if (save) this.saveSelectionsLocally();
  }

  saveSelectionsLocally() {
    localStorage.setItem(
      this.mergedSettings.saveAs ?? "a11y-center",
      JSON.stringify(this.selections)
    );
  }

  addTriggerListeners() {
    // Add event listeners to all elements with the data-a11y-trigger attribute
    const triggers = document.querySelectorAll("[data-a11y-trigger]");
    triggers.forEach((trigger) => {
      trigger.setAttribute("aria-controls", "a11y-center");
      trigger.setAttribute("aria-expanded", "false");
      trigger.addEventListener("click", this.toggleA11yCenter);
    });
  }

  toggleA11yCenter = (event: Event) => {
    const trigger = event.currentTarget as HTMLElement;
    this.activeTrigger = trigger;

    this.toggleVisibility();
  };

  closeA11yCenter = () => {
    const a11yCenterElement = document.getElementById("a11y-center");
    if (a11yCenterElement) {
      a11yCenterElement.setAttribute("aria-hidden", "true");
      a11yCenterElement.style.display = "none";
      if (this.activeTrigger) {
        this.activeTrigger.setAttribute("aria-expanded", "false");
        this.activeTrigger.focus();
      }
    }
  };

  toggleVisibility() {
    const a11yCenterElement = document.getElementById("a11y-center");
    if (a11yCenterElement) {
      const isVisible =
        a11yCenterElement.getAttribute("aria-hidden") === "false";
      if (isVisible) {
        this.closeA11yCenter();
      } else {
        a11yCenterElement.setAttribute("aria-hidden", "false");
        a11yCenterElement.style.display = "flex";
        this.activeTrigger?.setAttribute("aria-expanded", "true");
        const firstFocusable = a11yCenterElement.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }
    }
  }

  trapFocus = (event: KeyboardEvent) => {
    const a11yCenterElement = document.getElementById("a11y-center");
    if (
      !a11yCenterElement ||
      a11yCenterElement.getAttribute("aria-hidden") === "true"
    ) {
      return;
    }

    const focusableElements = a11yCenterElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === "Tab") {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    } else if (event.key === "Escape") {
      // Close the modal on Esc
      this.closeA11yCenter();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "a11y-center": a11yCenter;
  }
}
