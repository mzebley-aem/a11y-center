import { FontSizeSettings } from 'src/modules/font-size/types';
import { FontFamilySettings } from 'src/modules/font-family/types';
import { ColorThemeSettings } from 'src/modules/color-themes/types';
export interface CSSVariable {
    [key: string]: number | string;
}
export interface GenericOption {
    label: string;
    values: CSSVariable[];
    additionalCSS?: string;
    urlPath?: string;
}
export interface A11ySettings {
    saveAs?: string;
    id?: string;
    fontSize?: boolean | FontSizeSettings;
    fontFamily?: boolean | FontFamilySettings;
    colorTheme?: boolean | ColorThemeSettings;
    tokenURL?: string | null;
    [key: string]: any;
}
