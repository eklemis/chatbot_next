import { getDictionary } from "../../../dictionaries";
import { Summary } from "../../_views/summary";

export default async function Page({
	params,
	searchParams,
}: {
	params: { lang: string; id: string };
	searchParams: { edit?: string };
}) {
	const isEditing = searchParams.edit === "true";

	const lang = params.lang;
	const summaryId = params.id;

	const dict = await getDictionary(lang); // en

	return <Summary summaryId={summaryId} />;
}
