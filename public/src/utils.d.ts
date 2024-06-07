export declare function mergeSettings<T extends object>(defaultSettings: T, userSettings?: Partial<T>): T;
/**
 * Generates and appends a dynamic CSS style element based on the provided settings.
 *
 * @param settings - The settings containing the CSS variables to generate.
 * @param attribute - The data attribute used to apply the settings (e.g., "font-size").
 */
export declare function generateDynamicCSS(settings: any, attribute: string): void;
export declare function insertStyleLink(id: string, url: string): void;
export declare function insertStyleElement(id: string, cssText: string): void;
export declare function getFocusableElements(container: HTMLElement): HTMLElement[];
export declare function getNextFocusableElement(triggerId: string, a11yBarId: string): HTMLElement | null;
