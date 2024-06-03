import { html } from "lit";
export const layout = (content, header, classes = '') => html `
  <section id="a11y-center" role="dialog" aria-labelledby="a11y-center-header" aria-modal="true" aria-hidden="true" style="display: none;" class="${classes}">
    <span id="a11y-center-header" class="visually-hidden">${header}</span>
    ${content}
  </section>
`;
//# sourceMappingURL=layout.js.map