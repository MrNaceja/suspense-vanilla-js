import { isOneOfTypes } from "./utils.js";

/**
 * Suspends a container element with a fallback until the slow element is loaded.
 * @param {PropsSuspense} props
 * @return {HtmlElement}
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
 * @typedef {{
 *  container?: HTMLElement,
 *  fallback: HTMLElement,
 *  lazyElement: () => Promise<HTMLElement[] | Node[]>|Promise<HTMLElement | Node>,
 *  onSuspensionStart: () => void
 *  onSuspensionEnd?: () => void
 *  replace?: boolean,
 *  target: HTMLElement
 * }} PropsSuspense
 */
