function h(nodeName, attrs, ...args) {
  const children = args.length ? [].concat(...args) : null;
  return { nodeName, attrs, children };
}

function render(vnode) {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  const n = document.createElement(vnode.nodeName);
  Object.keys(vnode.attrs || {}).forEach(k => n.setAttribute(k, vnode.attrs[k]));
  (vnode.children || []).forEach(c => n.appendChild(render(c)));
  return n;
}

const items = "hello there ppl".split(" ");

function foo(arr) {
  return arr.map(p => h("li", {}, p));
}

const vdom = h("div", { id: "foo" }, [h("p", {}, "Look, a simple JSX DOM renderer"), h("ul", {}, foo(items))]);

const dom = render(vdom);
const json = JSON.stringify(vdom, null, "  ");

document.body.appendChild(dom);
document.body.appendChild(render(h("pre", {}, json)));
