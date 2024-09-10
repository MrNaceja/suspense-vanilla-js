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
 * @returns {Boolean}
 */
export const isOneOfTypes = (subject, types) => {
  let checks = false;
  types.some((T) => {
    if (subject instanceof Array) {
      subject.some((s) => (checks &&= s instanceof T));
      return;
    }
    checks = subject instanceof T;
  });
  return Boolean(checks);
};
