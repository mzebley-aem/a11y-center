import { html } from "lit";
export const layout = (content, header, id, classes = '') => html `
  <section id="${id}" role="dialog" aria-labelledby="a11y-center-header" aria-modal="true" aria-hidden="true" class="${classes}">
    <span id="a11y-center-header" class="visually-hidden">${header}</span>
    ${content}
  </section>
`;
//# sourceMappingURL=layout.js.map