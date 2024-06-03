import { __decorate, __metadata } from "tslib";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./styles/index.css";
import { v4 as uuidv4 } from "uuid";
import { layout } from "./templates/layout";
import { a11yBar } from "./templates/a11y-bar";
import { defaultA11ySettings } from "./settings/defaults";
import { mergeSettings, generateDynamicCSS } from "./utils";
let a11yCenter = class a11yCenter extends LitElement {
    constructor() {
        super();
        this.uniqueIdPrefix = "";
        this.activeTrigger = null;
        this.header = "Accessibility Center";
        this.settings = defaultA11ySettings;
        this.updateFontSizeSetting = (option, save = true) => {
            // Update the font size setting
            document.documentElement.setAttribute("data-a11y-font-size", option);
            this.selections.fontSize = option;
            this.requestUpdate(); // Ensure the component updates
            if (save)
                this.saveSelectionsLocally();
        };
        this.updateFontFamilySetting = (option, save = true) => {
            // Update the font family setting
            document.documentElement.setAttribute("data-a11y-font-family", option);
            this.selections.fontFamily = option;
            this.requestUpdate(); // Ensure the component updates
            if (save)
                this.saveSelectionsLocally();
        };
        this.toggleA11yCenter = (event) => {
            const trigger = event.currentTarget;
            this.activeTrigger = trigger;
            this.toggleVisibility();
        };
        this.closeA11yCenter = () => {
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
        this.trapFocus = (event) => {
            const a11yCenterElement = document.getElementById("a11y-center");
            if (!a11yCenterElement ||
                a11yCenterElement.getAttribute("aria-hidden") === "true") {
                return;
            }
            const focusableElements = a11yCenterElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
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
    updated(changedProperties) {
        if (changedProperties.has('settings')) {
            this.updateMergedSettings();
            this.buildSelectionObj();
        }
    }
    updateMergedSettings() {
        this.mergedSettings = mergeSettings(this.settings);
        generateDynamicCSS(this.mergedSettings.fontSize, 'font-size');
        generateDynamicCSS(this.mergedSettings.fontFamily, 'font-family');
    }
    buildSelectionObj() {
        var _a, _b, _c, _d, _e;
        this.selections = {};
        // Initialize selections with default values from settings
        if (this.mergedSettings.fontSize &&
            typeof this.mergedSettings.fontSize !== "boolean") {
            this.selections.fontSize =
                (_b = (_a = this.mergedSettings.fontSize.default) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : "";
        }
        if (this.mergedSettings.fontFamily &&
            typeof this.mergedSettings.fontFamily !== "boolean") {
            this.selections.fontFamily =
                (_d = (_c = this.mergedSettings.fontFamily.default) === null || _c === void 0 ? void 0 : _c.label) !== null && _d !== void 0 ? _d : "";
        }
        // Save default selections
        this.defaultSelections = Object.assign({}, this.selections);
        // Retrieve saved selections from localStorage
        const saved = JSON.parse(localStorage.getItem((_e = this.mergedSettings.saveAs) !== null && _e !== void 0 ? _e : "a11y-center") || "{}");
        // Update selections with any values from the saved object
        this.selections = Object.assign(Object.assign({}, this.selections), saved);
        this.applySelections(this.selections);
    }
    resetSelections() {
        // Reset selections to default values
        this.selections = Object.assign({}, this.defaultSelections);
        this.applySelections(this.selections);
        this.saveSelectionsLocally();
    }
    applySelections(selections) {
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
        return html `
      ${layout(a11yBar(this.closeA11yCenter, this.mergedSettings, this.selections, this.updateFontSizeSetting, this.updateFontFamilySetting, this.resetSelections), this.header, "a11y-bar open")}
    `;
    }
    saveSelectionsLocally() {
        var _a;
        localStorage.setItem((_a = this.mergedSettings.saveAs) !== null && _a !== void 0 ? _a : "a11y-center", JSON.stringify(this.selections));
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
        var _a;
        const a11yCenterElement = document.getElementById("a11y-center");
        if (a11yCenterElement) {
            const isVisible = a11yCenterElement.getAttribute("aria-hidden") === "false";
            if (isVisible) {
                this.closeA11yCenter();
            }
            else {
                a11yCenterElement.setAttribute("aria-hidden", "false");
                a11yCenterElement.style.display = "flex";
                (_a = this.activeTrigger) === null || _a === void 0 ? void 0 : _a.setAttribute("aria-expanded", "true");
                const firstFocusable = a11yCenterElement.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
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