import "server-only";

const descriptions = {
	en: () => import("./descriptions/en.json").then((module) => module.default),
	id: () => import("./descriptions/id.json").then((module) => module.default),
};

export const getDescription = async (locale) => descriptions[locale]();
