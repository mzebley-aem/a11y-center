import { FontSizeSettings } from 'src/modules/fontSize';
import { FontFamilySettings } from 'src/modules/fontFamily';


export interface CSSVariable {
  [key: string]: number | string;
}

export interface GenericOption {
  label: string;
  values: CSSVariable[];
}

export interface A11ySettings {
  saveAs?: string;
  fontSize?: boolean | FontSizeSettings;
  fontFamily?: boolean | FontFamilySettings;
  // Add more settings as needed
}

export interface A11ySelections {
  [key: string] : string
}