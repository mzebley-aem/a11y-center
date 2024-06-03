import { GenericOption } from "../settings/types";
import "src/templates/a11y-bar-panel";
export interface FontFamilySettings {
    options?: GenericOption[];
    default?: GenericOption;
    imports?: string[];
}
export declare const defaultFontFamilySettings: FontFamilySettings;
export declare const fontFamily: (settings: FontFamilySettings, updateFontFamilySetting: (option: string) => void, selection: string | null) => import("lit-html").TemplateResult<1>;
