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
 * @param {any} subject
 * @param {any[]} types
 * @param {boolean} allSameType
 * @returns {Boolean}
 */
export const isOneOfTypes = (subject, types, allSameType = false) => {
  let checks = false;
  if (!Array.isArray(subject)) {
    subject = [subject];
  }
  subject.forEach((s) => {
    s = Object(s); // Grant primitive proto instance validation
    if (allSameType) {
      checks &&= types.some((T) => s instanceof T);
    } else {
      types.forEach((T) => {
        checks ||= s instanceof T;
      });
    }
  });
  return Boolean(checks);
};
