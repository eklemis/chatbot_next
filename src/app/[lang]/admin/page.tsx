// List all created Assistants and Serve adding New Assistant
// Potentially List latest thread/converation with Assistants
import { getDictionary } from "../dictionaries";
import { NewAssistantForm } from "./_forms/new-assistant";
import { AssistantList } from "./_views/list-assistant";
import { SummaryList } from "./_views/list-summary.readonly";

export default async function Page({ params }: { params: { lang: string } }) {
	const lang = params.lang;
	const dict = await getDictionary(lang);
	const totalRows = 20;

	return (
		<div className="flex flex-col gap-y-8">
			<section className="flex flex-col items-center justify-center gap-y-4 p-4">
				<AssistantList dictionary={dict} />
				<NewAssistantForm dictionary={dict} />
			</section>
			<SummaryList currPage={1} totalPage={totalRows} dictionary={dict} />
		</div>
	);
}
