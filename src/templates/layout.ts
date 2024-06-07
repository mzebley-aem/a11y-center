import { html, TemplateResult } from "lit";

export const layout = (content: TemplateResult, header: string, id: string, classes: string = '') => html`
  <section id="${id}" role="dialog" aria-labelledby="a11y-center-header" aria-modal="true" aria-hidden="true" class="${classes}">
    <span id="a11y-center-header" class="visually-hidden">${header}</span>
    ${content}
  </section>
`;