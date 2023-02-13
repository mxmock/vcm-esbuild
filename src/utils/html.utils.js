import React from "react";
import ReactDOM, { hydrateRoot } from "react-dom/client";

const ENVS = { DEV: "development", PROD: "production" };

const injectInHtml = (id, Component, r = null, isStatic = true) => {
  const html = getElement(id);
  if (!html) return;
  const data = getHtmlData(html, id);
  const reactComponent = React.createElement(Component, { data });
  const toInject = !!r
    ? React.createElement(r.Provider, { store: r.store }, reactComponent)
    : reactComponent;
  handleRoot(html, toInject, isStatic);
};

const getElement = (id) => document.getElementById(id);

const getHtmlData = (domEl, id) => {
  const json = domEl.getAttribute(`data-${id}`);
  try {
    const data = JSON.parse(json);
    return data;
  } catch (e) {
    console.error(`Can't parse ${json}`, e.message);
    return {};
  }
};

const handleRoot = (domEl, component, isStatic = true) => {
  if (process?.env?.NODE_ENV === ENVS.PROD && isStatic) {
    console.log(`Hydrating root ${domEl.id}...`);
    hydrateRoot(domEl, component);
  } else {
    console.log(`Creating root ${domEl.id}...`);
    ReactDOM.createRoot(domEl).render(component);
  }
};

export default injectInHtml;
