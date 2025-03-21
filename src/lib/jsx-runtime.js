const appendChild = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach(nestedChild => appendChild(parent, nestedChild));
  } else {
    parent.appendChild(child.nodeType ? child : document.createTextNode(child));
  }
};

export const jsx = (tag, props) => {
  const element = document.createElement(tag)

  if (props.children) {
    if (Array.isArray(props.children)) {
      props.children.forEach(child => {
        appendChild(element, child);
      });
    } else {
      appendChild(element, props.children);
    }
  }

  Object.entries(props || {}).forEach(([name, value]) => {
    if (name === 'children') {
      return;
    }

    if (name === 'className' && value) {
      return element.classList.add(value);
    }

    if (name === 'style') {
      return Object.entries(value).forEach(([name, value]) => {
        element.style[name] = value;
      });
    }

    if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substring(2), value);
    } else {
      element.setAttribute(name, value ? value.toString() : '');
    }
  })

  return element
}

export const jsxs = jsx;
