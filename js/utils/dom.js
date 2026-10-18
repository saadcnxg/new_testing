export const qs = (selector, root = document) => root.querySelector(selector);

export const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value);
  }
  [].concat(children).forEach((child) => node.append(child));
  return node;
}

export const clear = (node) => node.replaceChildren();