import { LitElement } from "lit";
import { A11ySettings, A11ySelections } from "./settings/types";
export declare class a11yCenter extends LitElement {
    static styles: import("lit").CSSResultGroup[];
    private uniqueIdPrefix;
    private activeTrigger;
    private selections;
    private defaultSelections;
    header: string;
    settings: A11ySettings;
    private mergedSettings;
    constructor();
    connectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    updateMergedSettings(): void;
    buildSelectionObj(): void;
    resetSelections(): void;
    applySelections(selections: A11ySelections): void;
    injectStylesheet(): void;
    createRenderRoot(): this;
    render(): import("lit-html").TemplateResult<1>;
    updateFontSizeSetting: (option: string, save?: boolean) => void;
    updateFontFamilySetting: (option: string, save?: boolean) => void;
    saveSelectionsLocally(): void;
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
