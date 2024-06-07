import { LitElement } from "lit";
import { GenericOption } from "../settings/types";
export interface A11yBarPanelElement extends HTMLElement {
    options: GenericOption[];
    currentSelection: string;
    label: string;
    type: string;
    action: (option: string) => void;
    triggerId: string;
    parentId: string;
    open: boolean;
    showPanel: (selection: string) => void;
    hidePanel: () => void;
}
export declare class A11yBarPanel extends LitElement {
    options: GenericOption[];
    currentSelection: string;
    label: string;
    type: string;
    action: (option: string) => void;
    triggerId: string;
    parentId: string;
    open: boolean;
    createRenderRoot(): this;
    handleSelectionChange(event: Event): void;
    connectedCallback(): void;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    disconnectedCallback(): void;
    updatePanelPosition(): void;
    handleKeyboardNavigation(event: KeyboardEvent): void;
    showPanel(currentSelection: string): void;
    hidePanel(): void;
    handleDocumentMouseDown: (event: MouseEvent) => void;
    render(): import("lit-html").TemplateResult<1>;
}
