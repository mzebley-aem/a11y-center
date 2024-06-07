import { defaultA11ySettings } from "src/settings/defaults";
// Helper function to get default settings with labels
function getDefaultSettingsWithLabels() {
    const defaultSettings = Object.assign({}, defaultA11ySettings);
    for (const key in defaultSettings) {
        if (defaultSettings[key] && typeof defaultSettings[key] === 'object' && 'default' in defaultSettings[key]) {
            defaultSettings[key] = defaultSettings[key].default.label;
        }
    }
    return defaultSettings;
}
export function saveSelectionsLocally(key, variable, saveAs = "a11y-center-selections") {
    try {
        // Retrieve existing settings or use defaults
        const savedString = localStorage.getItem(saveAs);
        let saved;
        if (savedString) {
            try {
                saved = JSON.parse(savedString);
            }
            catch (parseError) {
                console.error('Error parsing saved settings:', parseError);
                saved = getDefaultSettingsWithLabels(); // Create a fresh copy of default settings with labels
            }
        }
        else {
            saved = getDefaultSettingsWithLabels(); // Create a fresh copy of default settings with labels
        }
        // Update the settings object
        saved[key] = variable;
        // Save the updated settings back to local storage
        try {
            localStorage.setItem(saveAs, JSON.stringify(saved));
        }
        catch (storageError) {
            console.error('Error saving to localStorage:', storageError);
        }
    }
    catch (error) {
        console.error('Unexpected error in saveSelectionsLocally:', error);
    }
}
export function getSavedSelections(saveAs = "a11y-center-selections", key) {
    try {
        // Retrieve the saved settings string from local storage
        const savedString = localStorage.getItem(saveAs);
        // Check if the saved settings exist
        if (savedString) {
            // If a specific key is provided
            if (key) {
                // Parse the saved settings string to an object
                const saved = JSON.parse(savedString);
                // Check if the specific key exists in the saved object
                if (!saved[key]) {
                    return null; // Return null if the key doesn't exist
                }
                // Return the value of the specific key
                return saved[key];
            }
            // If no specific key is provided, return the entire settings object
            return JSON.parse(savedString);
        }
    }
    catch (error) {
        // Log any unexpected errors that occur
        console.error('Unexpected error in getSavedSelections:', error);
    }
}
//# sourceMappingURL=local-storage.js.map