import { __decorate, __metadata } from "tslib";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { getFocusableElements, getNextFocusableElement } from "src/utils";
export class A11yBarPanel extends LitElement {
    constructor() {
        super(...arguments);
        this.options = [];
        this.currentSelection = "";
        this.label = "";
        this.type = "";
        this.triggerId = "";
        this.parentId = "";
        this.open = false;
        this.handleDocumentMouseDown = (event) => {
            var _a;
            if (this.open &&
                !this.contains(event.target) &&
                ((_a = event.target) === null || _a === void 0 ? void 0 : _a.id) !== this.triggerId) {
                this.hidePanel();
            }
        };
    }
    createRenderRoot() {
        return this; // disables shadow DOM
    }
    handleSelectionChange(event) {
        const target = event.target;
        this.action(target.value);
        this.updatePanelPosition();
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "dialog");
        this.setAttribute("aria-label", this.type + " options");
    }
    updated(changedProperties) {
        if (changedProperties.has("label")) {
            this.setAttribute("aria-label", "a11y center " + this.type + " options");
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.parentElement) {
            this.parentElement.removeChild(this);
        }
    }
    updatePanelPosition() {
        const a11yBar = document.querySelector("#" + this.parentId);
        if (a11yBar) {
            const a11yBarWidth = a11yBar.offsetWidth;
            this.style.right = `${a11yBarWidth}px`;
        }
    }
    handleKeyboardNavigation(event) {
        const trigger = document.getElementById(this.triggerId);
        const focusableElements = getFocusableElements(this);
        const radioInputs = Array.from(this.querySelectorAll(".usa-radio__input"));
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        const isRadioInput = (element) => radioInputs.includes(element);
        const getFieldset = (element) => element.closest("fieldset");
        if (this.open && event.key === "Tab" && !event.shiftKey) {
            if (event.target === trigger) {
                event.preventDefault();
                if (radioInputs.length > 0) {
                    const selectedRadio = radioInputs.find((radio) => radio.checked) ||
                        radioInputs[0];
                    selectedRadio.focus();
                }
                else {
                    firstFocusableElement === null || firstFocusableElement === void 0 ? void 0 : firstFocusableElement.focus();
                }
                return;
            }
            else if (event.target === lastFocusableElement) {
                event.preventDefault();
                this.hidePanel();
                const nextFocusableElement = getNextFocusableElement(this.triggerId, "a11y-center");
                nextFocusableElement === null || nextFocusableElement === void 0 ? void 0 : nextFocusableElement.focus();
                return;
            }
            else if (isRadioInput(event.target)) {
                const currentFieldset = getFieldset(event.target);
                if (currentFieldset) {
                    const fieldsets = Array.from(this.querySelectorAll("fieldset"));
                    const currentIndex = fieldsets.indexOf(currentFieldset);
                    if (currentIndex === fieldsets.length - 1) {
                        event.preventDefault();
                        this.hidePanel();
                        const nextFocusableElement = getNextFocusableElement(this.triggerId, "a11y-center");
                        nextFocusableElement === null || nextFocusableElement === void 0 ? void 0 : nextFocusableElement.focus();
                    }
                }
                return;
            }
        }
        else if (this.open && event.key === "Tab" && event.shiftKey) {
            if (event.target === firstFocusableElement) {
                event.preventDefault();
                trigger === null || trigger === void 0 ? void 0 : trigger.focus();
                return;
            }
            else if (event.target === trigger) {
                this.hidePanel();
                return;
            }
            else if (isRadioInput(event.target)) {
                const currentFieldset = getFieldset(event.target);
                if (currentFieldset) {
                    const fieldsets = Array.from(this.querySelectorAll("fieldset"));
                    const currentIndex = fieldsets.indexOf(currentFieldset);
                    if (currentIndex === 0) {
                        event.preventDefault();
                        trigger === null || trigger === void 0 ? void 0 : trigger.focus();
                    }
                }
                return;
            }
        }
        else if (event.key === "Escape") {
            this.hidePanel();
            trigger === null || trigger === void 0 ? void 0 : trigger.focus();
        }
    }
    showPanel(currentSelection) {
        this.updatePanelPosition();
        this.style.display = "flex";
        this.open = true;
        // Update current selection before showing the panel
        this.currentSelection = currentSelection;
        const trigger = document.getElementById(this.triggerId);
        trigger === null || trigger === void 0 ? void 0 : trigger.setAttribute("aria-expanded", "true");
        trigger === null || trigger === void 0 ? void 0 : trigger.addEventListener("keydown", this.handleKeyboardNavigation.bind(this));
        document.addEventListener("mousedown", this.handleDocumentMouseDown);
        this.addEventListener("keydown", this.handleKeyboardNavigation.bind(this));
    }
    hidePanel() {
        this.style.display = "none";
        this.open = false;
        const trigger = document.getElementById(this.triggerId);
        trigger === null || trigger === void 0 ? void 0 : trigger.removeEventListener("keydown", this.handleKeyboardNavigation.bind(this));
        trigger === null || trigger === void 0 ? void 0 : trigger.setAttribute("aria-expanded", "false");
        document.removeEventListener("mousedown", this.handleDocumentMouseDown);
        this.removeEventListener("keydown", this.handleKeyboardNavigation.bind(this));
    }
    render() {
        return html `
      <form
        class="usa-form"
        aria-describedby="a11y-bar-panel-${this.type}-form-legend"
      >
        <fieldset class="usa-fieldset display-flex flex-column gap-05">
          <legend
            id="a11y-bar-panel-${this.type}-form-legend"
            class="usa-legend usa-legend"
          >
            ${this.label}
          </legend>
          ${this.options.map((option) => html `
              <div class="usa-radio">
                <input
                  class="usa-radio__input usa-radio__input--tile"
                  id="a11y-bar-panel-${this.type}-option-${option.label}"
                  type="radio"
                  .checked="${this.currentSelection === option.label}"
                  @change="${this.handleSelectionChange}"
                  name="a11y-bar-panel-${this.type}-options"
                  value="${option.label}"
                />
                <label
                  class="usa-radio__label"
                  for="a11y-bar-panel-${this.type}-option-${option.label}"
                  >${option.label}</label
                >
              </div>
            `)}
        </fieldset>
      </form>
    `;
    }
}
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], A11yBarPanel.prototype, "options", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], A11yBarPanel.prototype, "label", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], A11yBarPanel.prototype, "type", void 0);
__decorate([
    property({ type: Function }),
    __metadata("design:type", Function)
], A11yBarPanel.prototype, "action", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], A11yBarPanel.prototype, "triggerId", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], A11yBarPanel.prototype, "parentId", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Boolean)
], A11yBarPanel.prototype, "open", void 0);
customElements.define("a11y-bar-panel", A11yBarPanel);
//# sourceMappingURL=a11y-bar-panel.js.map