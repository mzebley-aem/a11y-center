// Helper function to perform deep merge of objects
function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}
export function mergeSettings(defaultSettings, userSettings = {}) {
    // Deep merge default settings with user settings
    const mergedSettings = deepMerge(Object.assign({}, defaultSettings), userSettings);
    return mergedSettings;
}
/**
 * Generates and appends a dynamic CSS style element based on the provided settings.
 *
 * @param settings - The settings containing the CSS variables to generate.
 * @param attribute - The data attribute used to apply the settings (e.g., "font-size").
 */
export function generateDynamicCSS(settings, attribute) {
    var _a;
    // Remove existing dynamic styles
    const existingStyleElement = document.getElementById(`a11y-dynamic-styles-${attribute}`);
    if (existingStyleElement) {
        existingStyleElement.remove();
    }
    const styleElement = document.createElement("style");
    styleElement.id = `a11y-dynamic-styles-${attribute}`;
    let cssText = "";
    (_a = settings.options) === null || _a === void 0 ? void 0 : _a.forEach((option) => {
        if (!option.urlPath) {
            let cssVariables = "";
            option.values.forEach((variable) => {
                const key = Object.keys(variable)[0];
                const value = variable[key];
                cssVariables += `${key}: ${value}; `;
            });
            if (option.additionalCSS) {
                cssVariables += option.additionalCSS;
            }
            cssText += `html[data-a11y-${attribute}="${option.label}"] { 
      ${cssVariables} 
    } `;
        }
        else {
            cssText += `html[data-a11y-${attribute}="${option.label}"] { @import url('${option.urlPath}');}`;
        }
    });
    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);
}
// Function to insert a link to a stylesheet in the head of the document
export function insertStyleLink(id, url) {
    const head = document.head;
    // Remove any existing a11y-center stylesheets
    const existingStylesheet = document.getElementById(id);
    if (existingStylesheet) {
        head.removeChild(existingStylesheet);
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.id = id;
    head.appendChild(link);
}
// Function to insert a style element in the head of the document
export function insertStyleElement(id, cssText) {
    const head = document.head;
    // Remove any existing a11y-center stylesheets
    const existingStylesheet = document.getElementById(id);
    if (existingStylesheet) {
        head.removeChild(existingStylesheet);
    }
    const style = document.createElement("style");
    style.textContent = cssText;
    style.id = id;
    head.appendChild(style);
}
// Utility function to get all focusable elements within a container
export function getFocusableElements(container) {
    return Array.from(container.querySelectorAll('input[type=radio], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
}
// Function to get the next focusable element in the a11y bar
export function getNextFocusableElement(triggerId, a11yBarId) {
    const a11yBar = document.getElementById(a11yBarId);
    const trigger = document.getElementById(triggerId);
    if (!a11yBar || !trigger)
        return null;
    const focusableElements = getFocusableElements(a11yBar);
    const triggerIndex = focusableElements.indexOf(trigger);
    if (triggerIndex === -1 || triggerIndex + 1 >= focusableElements.length) {
        return null; // No next focusable element
    }
    return focusableElements[triggerIndex + 1];
}
//# sourceMappingURL=utils.js.map