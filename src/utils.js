/**
 * Convert string HTML to DOM.
 * @param {string} html
 * @returns {HTMLElement}
 */
export const asDOM = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
};

/**
 * Add delay to async utilities.
 * @param {number} time
 * @return {Promise<void>}
 */
export const delay = (time) => new Promise((ok) => setTimeout(ok, time));

/**
 * Checks if subject is one of types.
 * @param {any|any[]} subject   - Subject to validate type
 * @param {any[]} types         - Array of types to validation
 * @param {boolean} allSameType - If true, only the first type will be doit validation
 * @returns {Boolean}
 */
export const isOneOfTypes = (subject, types, allSameType = false) => {
  if (!Array.isArray(subject)) {
    subject = [subject];
  }
  subject = subject.map((s) => Object(s)); // To correct primitive proto validation
  if (allSameType) {
    const T = types.shift();
    return subject.every((s) => s instanceof T);
  }
  return subject.some((s) => types.some((T) => s instanceof T));
};
