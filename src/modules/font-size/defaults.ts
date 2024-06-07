import { GenericOption } from "../../settings/types";
import { FontSizeSettings } from "./types";
// Default font size options
const defaultFontSizeOptions: GenericOption[] = [
    {
      label: "Default",
      values: [
        { "--a11y-font-size-modifier": 1 },
        { "--a11y-line-height-modifier": 1 },
        { "--a11y-spacing-modifier": 1 },
        { "--a11y-letter-spacing-modifier": 1 },
      ],
    },
    {
      label: "Large",
      values: [
        { "--a11y-font-size-modifier": 1.25 },
        { "--a11y-line-height-modifier": 1.125 },
        { "--a11y-spacing-modifier": 1.15 },
        { "--a11y-letter-spacing-modifier": 1.125 },
      ],
    },
    {
      label: "Larger",
      values: [
        { "--a11y-font-size-modifier": 1.5 },
        { "--a11y-line-height-modifier": 1.125 },
        { "--a11y-spacing-modifier": 1.25 },
        { "--a11y-letter-spacing-modifier": 1.325 },
      ],
      additionalCSS: `.accessibility-layout,
      .accessibility-layout.display-flex.flex-row {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          align-content: flex-start;
      }
  
      .accessibility-margin-left-0 {
          margin-left: 0;
      }
  
      .accessibility-layout>*,
      .accessibility-layout.display-flex.flex-row>* {
          flex: 1;
          flex-basis: 100%;
          width: 100%;
      }
  
      @media (min-width: 40em) {
          .usa-graphic-list .usa-graphic-list__row:last-child .usa-media-block {
              margin-bottom: var(--usa-spacing-8);
          }
      }`,
    },
  ];
  
  // Default font size settings object
  export const defaultFontSizeSettings: FontSizeSettings = {
    options: defaultFontSizeOptions,
    default: defaultFontSizeOptions[0],
  };
  