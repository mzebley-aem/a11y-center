import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { GenericOption } from "../settings/types";
import { getFocusableElements, getNextFocusableElement } from "src/utils";

export interface A11yBarPanelElement extends HTMLElement {
  options: GenericOption[];
  currentSelection: string;
  label: string;
  updateSelection: (option: string) => void;
  triggerId: string;
  a11yBarClass: string;
  open: boolean;
  showPanel: () => void;
  hidePanel: () => void;
}

export class A11yBarPanel extends LitElement {
  @property({ type: Array }) options: GenericOption[] = [];
  @property({ type: String }) currentSelection: string = "";
  @property({ type: String }) label: string = "";
  @property({ type: String }) type: string = "";
  @property({ type: Function }) updateSelection!: (option: string) => void;
  @property({ type: String }) triggerId: string = "";
  @property({ type: String }) a11yBarClass: string = "";

  @property({ type: Boolean }) open: boolean = false;

  createRenderRoot() {
    return this; // disables shadow DOM
  }

  handleSelectionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.updateSelection(target.value);
    this.updatePanelPosition();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  updatePanelPosition() {
    const a11yBar = document.querySelector(this.a11yBarClass) as HTMLElement;
    if (a11yBar) {
      const a11yBarWidth = a11yBar.offsetWidth;
      this.style.right = `${a11yBarWidth}px`;
    }
  }

  // Keyboard navigation
  // Expected flow:
  // If panel is open and the user presses tab on the trigger, focus should go to the first element in the panel
  // If panel is open and the user presses shift + tab on the first element in the panel, focus should go back to the trigger
  // If panel is open and the user presses tab on the last element in the panel, focus should go to the next focusable element in the a11y bar and the panel should close
  // If panel is open and the user clicks outside the panel, the panel should close

  // Keyboard navigation handler
  handleKeyboardNavigation(event: KeyboardEvent) {
    const trigger = document.getElementById(this.triggerId) as HTMLElement;
    const focusableElements = getFocusableElements(this);
    const radioInputs = Array.from(this.querySelectorAll('.usa-radio__input'));
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    const isRadioInput = (element: HTMLElement) => radioInputs.includes(element);
    const getFieldset = (element: HTMLElement) => element.closest('fieldset');

    if (this.open && event.key === "Tab" && !event.shiftKey) {
      if (event.target === trigger) {
        event.preventDefault();
        if (radioInputs.length > 0) {
          const selectedRadio = radioInputs.find((radio) => (radio as HTMLInputElement).checked) || radioInputs[0];
          (selectedRadio as HTMLInputElement).focus();
        } else {
          firstFocusableElement?.focus();
        }
        return
      } else if (event.target === lastFocusableElement) {
        event.preventDefault();
        this.hidePanel();
        const nextFocusableElement = getNextFocusableElement(this.triggerId, 'a11y-center');
        nextFocusableElement?.focus();
        return
      } else if (isRadioInput(event.target as HTMLElement)) {
        const currentFieldset = getFieldset(event.target as HTMLElement);
        if (currentFieldset) {
          const fieldsets = Array.from(this.querySelectorAll('fieldset'));
          const currentIndex = fieldsets.indexOf(currentFieldset);
          if (currentIndex === fieldsets.length - 1) {
            event.preventDefault();
            this.hidePanel();
            const nextFocusableElement = getNextFocusableElement(this.triggerId, 'a11y-center');
            nextFocusableElement?.focus();
          }
        }
        return
      }
    } else if (this.open && event.key === "Tab" && event.shiftKey) {
      if (event.target === firstFocusableElement) {
        event.preventDefault();
        trigger?.focus();
        return
      } else if (event.target === trigger) {
        this.hidePanel();
        return
      }
    }
  }

  showPanel() {
    this.updatePanelPosition();
    this.style.display = "flex";
    this.open = true;
    this.setAttribute("aria-expanded", "true");

    // Create tab focus logic for trigger
    const trigger = document.getElementById(this.triggerId) as HTMLElement;
    trigger?.addEventListener("keydown", this.handleKeyboardNavigation.bind(this));

    // Add event listener for outside clicks
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
    this.addEventListener("keydown", this.handleKeyboardNavigation.bind(this));
  }

  hidePanel() {
    this.style.display = "none";
    this.open = false;
    this.setAttribute("aria-expanded", "false");

    // Remove tab focus logic for trigger
    const trigger = document.getElementById(this.triggerId) as HTMLElement;
    trigger?.removeEventListener("keydown", this.handleKeyboardNavigation.bind(this));

    // Remove event listener for outside clicks
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
    this.removeEventListener("keydown", this.handleKeyboardNavigation.bind(this));
  }

  handleDocumentMouseDown = (event: MouseEvent) => {
    if (
      this.open &&
      !this.contains(event.target as Node) &&
      (event.target as HTMLElement)?.id !== this.triggerId
    ) {
      this.hidePanel();
    }
  };

  render() {
    return html`
      <form class="usa-form">
        <fieldset class="usa-fieldset display-flex flex-column gap-05">
          <legend class="usa-legend usa-legend">${this.label}</legend>
          ${this.options.map(
            (option) => html`
              <div class="usa-radio">
                <input
                  class="usa-radio__input usa-radio__input--tile"
                  id="a11y-bar-panel-${this.type}-option-${option.label}"
                  type="radio"
                  ?checked="${this.currentSelection === option.label}"
                  @change="${this.handleSelectionChange}"
                  name="a11y-bar-panel-${this.type}-options"
                  value="${option.label}"
                />
                <label class="usa-radio__label" for="a11y-bar-panel-${this.type}-option-${option.label}"
                  >${option.label}</label>
              </div>
            `
          )}
        </fieldset>
      </form>
    `;
  }
}

customElements.define("a11y-bar-panel", A11yBarPanel);
