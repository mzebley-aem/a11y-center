import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./styles/index.css";
import variables from "./styles/_variables.css"; // Importing default variables as a string

import { v4 as uuidv4 } from "uuid";

import { layout } from "./templates/layout";
import { a11yBar } from "./templates/a11y-bar";
import { defaultA11ySettings } from "./settings/defaults";
import { A11ySettings } from "./settings/types";
import { mergeSettings, getFocusableElements, insertStyleLink, insertStyleElement } from "./utils";

@customElement("a11y-center")
export class a11yCenter extends LitElement {
  static styles = [styles];
  private uniqueIdPrefix: string = "";
  private activeTrigger: HTMLElement | null = null;

  @property({ type: String })
  header = "Accessibility Center";

  @property({ type: Object })
  settings: A11ySettings = {};

  private mergedSettings!: A11ySettings;

  constructor() {
    super();
    this.uniqueIdPrefix = uuidv4().slice(0, 9);
    this.addTriggerListeners();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateMergedSettings();
    this.addTriggerListeners();
    document.addEventListener("keydown", this.trapFocus);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.trapFocus);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("settings")) {
      this.updateMergedSettings();
    }
  }

  updateMergedSettings() {
    if (!this.settings.id) this.settings.id = defaultA11ySettings.id + "-" + this.uniqueIdPrefix;
    this.mergedSettings = mergeSettings(defaultA11ySettings, this.settings);
    if (this.mergedSettings.fontSize === true) {
      this.mergedSettings.fontSize = defaultA11ySettings.fontSize;
    }
    if (this.mergedSettings.fontFamily === true) {
      this.mergedSettings.fontFamily = defaultA11ySettings.fontFamily;
    }
    this.injectStylesheet();

  }

  reset() {
    this.dispatchEvent(new CustomEvent('reset-settings', { bubbles: true, composed: true }));
  }

  injectStylesheet() {
    const head = document.head;

    if (this.mergedSettings.tokenURL) {
      // If a custom stylesheet URL is provided, add it as a link
      insertStyleLink("a11y-center-tokens", this.mergedSettings.tokenURL);
    } else {
      // If no custom stylesheet URL is provided, import the default variables stylesheet
      insertStyleElement("a11y-center-tokens", variables.toString());
    }

    insertStyleElement("a11y-center-styles", styles.toString());
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
          this.reset
        ),
        this.header,
        this.mergedSettings.id?? 'a11y-center',
        "a11y-bar"
      )}
    `;
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
    const a11yCenterElement = document.getElementById(this.mergedSettings.id?? 'a11y-center');
    if (a11yCenterElement) {
      a11yCenterElement.setAttribute("aria-hidden", "true");
      a11yCenterElement.style.visibility = "hidden";
      if (this.activeTrigger) {
        this.activeTrigger.setAttribute("aria-expanded", "false");
        this.activeTrigger.focus();
      }
      // close all a11y-bar-panel elements
      const a11yBarPanels = a11yCenterElement.querySelectorAll<HTMLElement>(
        "a11y-bar-panel"
      );
      a11yBarPanels.forEach((panel: any) => {
        panel.hidePanel();
      });
    }
  };

  toggleVisibility() {
    const a11yCenterElement = document.getElementById(this.mergedSettings.id?? 'a11y-center');
    if (a11yCenterElement) {
      const isVisible =
        a11yCenterElement.getAttribute("aria-hidden") === "false";
      if (isVisible) {
        this.closeA11yCenter();
      } else {
        a11yCenterElement.setAttribute("aria-hidden", "false");
        a11yCenterElement.style.visibility = "visible";
        this.activeTrigger?.setAttribute("aria-expanded", "true");
        const firstFocusable = getFocusableElements(a11yCenterElement)[0];
        firstFocusable?.focus();
      }
    }
  }

  trapFocus = (event: KeyboardEvent) => {
    // Function to check if the event target is a child of an a11y-bar-panel
    const isChildOfA11yBarPanel = (element: HTMLElement | null): boolean => {
      while (element) {
        if (element.tagName.toLowerCase() === 'a11y-bar-panel') {
          return true;
        }
        element = element.parentElement;
      }
      return false;
    };
  
    if (isChildOfA11yBarPanel(event.target as HTMLElement)) {
      // If the event target is a child of an open a11y-bar-panel, skip the a11y-center focus trap logic
      return;
    }
  
    const a11yCenterElement = document.getElementById(this.mergedSettings.id?? 'a11y-center');
    if (
      !a11yCenterElement ||
      a11yCenterElement.getAttribute("aria-hidden") === "true"
    ) {
      return;
    }
  
    const focusableElements = getFocusableElements(a11yCenterElement);
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
