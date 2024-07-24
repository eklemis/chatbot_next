import "server-only";

const descriptions = {
	en: () => import("./_descriptions/en.json").then((module) => module.default),
	id: () => import("./_descriptions/id.json").then((module) => module.default),
};

export const getDescription = async (locale) => descriptions[locale]();
