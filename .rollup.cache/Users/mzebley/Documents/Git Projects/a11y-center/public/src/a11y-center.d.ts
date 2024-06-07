import { LitElement } from "lit";
import { A11ySettings } from "./settings/types";
export declare class a11yCenter extends LitElement {
    static styles: import("lit").CSSResultGroup[];
    private uniqueIdPrefix;
    private activeTrigger;
    header: string;
    settings: A11ySettings;
    private mergedSettings;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    updateMergedSettings(): void;
    reset(): void;
    injectStylesheet(): void;
    createRenderRoot(): this;
    render(): import("lit-html").TemplateResult<1>;
    addTriggerListeners(): void;
    toggleA11yCenter: (event: Event) => void;
    closeA11yCenter: () => void;
    toggleVisibility(): void;
    trapFocus: (event: KeyboardEvent) => void;
}
declare global {
    interface HTMLElementTagNameMap {
        "a11y-center": a11yCenter;
    }
}
