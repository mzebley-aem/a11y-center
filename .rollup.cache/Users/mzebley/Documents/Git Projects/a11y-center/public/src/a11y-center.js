import { __decorate, __metadata } from "tslib";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./styles/index.css";
import variables from "./styles/_variables.css"; // Importing default variables as a string
import { v4 as uuidv4 } from "uuid";
import { layout } from "./templates/layout";
import { a11yBar } from "./templates/a11y-bar";
import { defaultA11ySettings } from "./settings/defaults";
import { mergeSettings, getFocusableElements, insertStyleLink, insertStyleElement } from "./utils";
let a11yCenter = class a11yCenter extends LitElement {
    constructor() {
        super();
        this.uniqueIdPrefix = "";
        this.activeTrigger = null;
        this.header = "Accessibility Center";
        this.settings = {};
        this.toggleA11yCenter = (event) => {
            const trigger = event.currentTarget;
            this.activeTrigger = trigger;
            this.toggleVisibility();
        };
        this.closeA11yCenter = () => {
            var _a;
            const a11yCenterElement = document.getElementById((_a = this.mergedSettings.id) !== null && _a !== void 0 ? _a : 'a11y-center');
            if (a11yCenterElement) {
                a11yCenterElement.setAttribute("aria-hidden", "true");
                a11yCenterElement.style.visibility = "hidden";
                if (this.activeTrigger) {
                    this.activeTrigger.setAttribute("aria-expanded", "false");
                    this.activeTrigger.focus();
                }
                // close all a11y-bar-panel elements
                const a11yBarPanels = a11yCenterElement.querySelectorAll("a11y-bar-panel");
                a11yBarPanels.forEach((panel) => {
                    panel.hidePanel();
                });
            }
        };
        this.trapFocus = (event) => {
            var _a;
            // Function to check if the event target is a child of an a11y-bar-panel
            const isChildOfA11yBarPanel = (element) => {
                while (element) {
                    if (element.tagName.toLowerCase() === 'a11y-bar-panel') {
                        return true;
                    }
                    element = element.parentElement;
                }
                return false;
            };
            if (isChildOfA11yBarPanel(event.target)) {
                // If the event target is a child of an open a11y-bar-panel, skip the a11y-center focus trap logic
                return;
            }
            const a11yCenterElement = document.getElementById((_a = this.mergedSettings.id) !== null && _a !== void 0 ? _a : 'a11y-center');
            if (!a11yCenterElement ||
                a11yCenterElement.getAttribute("aria-hidden") === "true") {
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
                }
                else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
            else if (event.key === "Escape") {
                // Close the modal on Esc
                this.closeA11yCenter();
            }
        };
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
    updated(changedProperties) {
        if (changedProperties.has("settings")) {
            this.updateMergedSettings();
        }
    }
    updateMergedSettings() {
        if (!this.settings.id)
            this.settings.id = defaultA11ySettings.id + "-" + this.uniqueIdPrefix;
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
        }
        else {
            // If no custom stylesheet URL is provided, import the default variables stylesheet
            insertStyleElement("a11y-center-tokens", variables.toString());
        }
        insertStyleElement("a11y-center-styles", styles.toString());
    }
    createRenderRoot() {
        return this;
    }
    render() {
        var _a;
        return html `
      ${layout(a11yBar(this.closeA11yCenter, this.mergedSettings, this.reset), this.header, (_a = this.mergedSettings.id) !== null && _a !== void 0 ? _a : 'a11y-center', "a11y-bar")}
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
    toggleVisibility() {
        var _a, _b;
        const a11yCenterElement = document.getElementById((_a = this.mergedSettings.id) !== null && _a !== void 0 ? _a : 'a11y-center');
        if (a11yCenterElement) {
            const isVisible = a11yCenterElement.getAttribute("aria-hidden") === "false";
            if (isVisible) {
                this.closeA11yCenter();
            }
            else {
                a11yCenterElement.setAttribute("aria-hidden", "false");
                a11yCenterElement.style.visibility = "visible";
                (_b = this.activeTrigger) === null || _b === void 0 ? void 0 : _b.setAttribute("aria-expanded", "true");
                const firstFocusable = getFocusableElements(a11yCenterElement)[0];
                firstFocusable === null || firstFocusable === void 0 ? void 0 : firstFocusable.focus();
            }
        }
    }
};
a11yCenter.styles = [styles];
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], a11yCenter.prototype, "header", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], a11yCenter.prototype, "settings", void 0);
a11yCenter = __decorate([
    customElement("a11y-center"),
    __metadata("design:paramtypes", [])
], a11yCenter);
export { a11yCenter };
//# sourceMappingURL=a11y-center.js.map