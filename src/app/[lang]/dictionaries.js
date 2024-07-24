import "server-only";

const dictionaries = {
	en: () => import("./_dictionaries/en.json").then((module) => module.default),
	id: () => import("./_dictionaries/id.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
