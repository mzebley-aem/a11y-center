import { LitElement } from "lit";
import { GenericOption } from "../settings/types";
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
export declare class A11yBarPanel extends LitElement {
    options: GenericOption[];
    currentSelection: string;
    label: string;
    type: string;
    updateSelection: (option: string) => void;
    triggerId: string;
    a11yBarClass: string;
    open: boolean;
    createRenderRoot(): this;
    handleSelectionChange(event: Event): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updatePanelPosition(): void;
    handleKeyboardNavigation(event: KeyboardEvent): void;
    showPanel(): void;
    hidePanel(): void;
    handleDocumentMouseDown: (event: MouseEvent) => void;
    render(): import("lit-html").TemplateResult<1>;
}
