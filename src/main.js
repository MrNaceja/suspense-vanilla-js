import { isOneOfTypes } from "./utils.js";

/**
 * Suspends a container element with a fallback until the slow element is loaded.
 * @param {PropsSuspense} props
 * @return {HtmlElement} Suspensed Container
 * @throws {TypeError}
 */
export const Suspense = ({
  container,
  fallback,
  lazyElement,
  replace = false,
  onSuspensionStart,
  onSuspensionEnd,
  target,
}) => {
  if (!isOneOfTypes(lazyElement, [Promise, Function])) {
    throw new TypeError(
      "lazyElement should be promise return element(s) or async function returning element(s)."
    );
  }

  if (!container) {
    container = document.createElement("slot");
  }

  onSuspensionStart && onSuspensionStart();

  container.classList.add("suspense");
  container.replaceChildren([]); // Clear container
  container.append(fallback);

  if (target && !target.contains(container)) {
    target.append(container);
  }

  if (lazyElement instanceof Function) {
    lazyElement = lazyElement();
  }

  lazyElement.then((element) => {
    if (!isOneOfTypes(element, [Element, Node])) {
      throw new TypeError(
        "lazyElement should return DOM Elements (Element or Node)."
      );
    }
    if (!(element instanceof Array)) {
      element = [element];
    }
    fallback.replaceWith(...element);
    if (replace) {
      container.replaceWith(...container.childNodes);
    }
    container.classList.remove("suspense");
    onSuspensionEnd && onSuspensionEnd();
  });

  return container;
};

// Using with CDN
window.Suspense = Suspense;

/**
 * @typedef {Object} PropsSuspense
 * @property {HTMLElement}       container   - DOM Suspense container element, if not provides will be created.
 * @property {HTMLElement?}      target      - DOM Target Element to append suspensed element.
 * @property {HTMLElement}       fallback    - DOM Element to display while lazy element is loading.
 * @property {LazyElementLoader} lazyElement - Promise or Function (async to return promise) returning lazy element, in this function, data can be fetched from an API to assemble a listing, for example.
 * @property {boolean}           replace     - Indicates that lazy content element(s) loading should replace the suspense container.
 * @property {Function}         onSuspensionStart - Callback function runned on suspension start (before fallback element append on container).
 * @property {Function}         onSuspensionStart - Callback function runned on suspension end (after lazy element(s) appended on container).
 *
 * @typedef {() => Promise<HtmlElement|HtmlElement[]> | Promise<HtmlElement|HtmlElement[]>} LazyElementLoader
 */
