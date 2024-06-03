import { GenericOption } from "../settings/types";
export interface FontSizeSettings {
    options?: GenericOption[];
    default?: GenericOption;
}
export declare const defaultFontSizeSettings: FontSizeSettings;
export declare const fontSize: (settings: FontSizeSettings, updateFontSizeSetting: (option: string) => void, selection: string | null) => import("lit-html").TemplateResult<1>;
