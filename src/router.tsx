import { createElement, type ComponentType } from "react";

interface PageModule {
  default: ComponentType;
}

const pages = import.meta.glob<PageModule>("./pages/**/*.tsx", { eager: true });

const routes = Object.entries(pages).map(([path, module]) => {
  const routePath = path
    .replace("./pages", "")
    .replace(/\.tsx$/, "")
    .replace(/\/index$/, "")
    .toLowerCase();

  return {
    path: routePath,
    element: createElement(module.default),
  };
});

export default routes;
