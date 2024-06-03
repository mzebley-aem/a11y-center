const template = `<article id="accessibilityCenter">
    <button aria-controls="accessibilityCenter"
        type="button" style="flex-direction: column;top:var(--usa-spacing-1)"
        class="usa-button padding-1 usa-button--unstyled ">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24"
            viewBox="0 0 24 24" stroke-width="3" style="width:var(--usa-spacing-3);height:var(--usa-spacing-3)"
            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>
        Close
    </button>
    <div class="content">
        <button type="button" style="flex-direction: column;"
            class="usa-button padding-y-105 padding-x-105 usa-button--unstyled width-full">
                <svg xmlns="http://www.w3.org/2000/svg"
                    style="--usa-button-icon-size:var(--usa-spacing-4);fill:none" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-color-swatch">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2" />
                    <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9" />
                    <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12" />
                    <path d="M17 17l0 .01" />
                </svg>
            Theme</button>
        <button type="button" style="flex-direction: column;"
            class="usa-button padding-y-105 padding-x-105 usa-button--unstyled width-full">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-text-size" width="24" height="24"
                    style="--usa-button-icon-size:var(--usa-spacing-4)" viewBox="0 0 24 24" stroke-width="2.25"
                    stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 7v-2h13v2" />
                    <path d="M10 5v14" />
                    <path d="M12 19h-4" />
                    <path d="M15 13v-1h6v1" />
                    <path d="M18 12v7" />
                    <path d="M17 19h2" />
                </svg>
            Text Size</button>
        <button type="button" style="flex-direction: column;"
            class="usa-button padding-y-105 padding-x-205 usa-button--unstyled width-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-typography"
                    style="fill:none; --usa-button-icon-size:var(--usa-spacing-4)">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 20l3 0" />
                    <path d="M14 20l7 0" />
                    <path d="M6.9 15l6.9 0" />
                    <path d="M10.2 6.3l5.8 13.7" />
                    <path d="M5 20l6 -16l2 0l7 16" />
                </svg>
            Font</button>
        <button type="button" style="flex-direction: column;"
            class="usa-button padding-y-105 padding-x-205 usa-button--unstyled width-full">
                <svg xmlns="http://www.w3.org/2000/svg"
                    style="fill:none; --usa-button-icon-size:var(--usa-spacing-4)" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-layout-board-split">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                    <path d="M4 12h8" />
                    <path d="M12 15h8" />
                    <path d="M12 9h8" />
                    <path d="M12 4v16" />
                </svg>
            Layout</button>
    </div>
    
    <button type="button" style="flex-direction: column;"
        class="usa-button padding-y-105 padding-x-205 usa-button--unstyled width-full">Reset</button>
    <div aria-live="polite" id="statusMessage" class="visually-hidden">hi</div>
</article>
`

export default template