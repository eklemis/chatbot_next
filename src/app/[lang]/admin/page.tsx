// List all created Assistants and Serve adding New Assistant
// Potentially List latest thread/converation with Assistants
import { getDictionary } from "../dictionaries";
import { NewAssistantForm } from "./_forms/new-assistant";
import { AssistantList } from "./_views/list-assistant";

export default async function Page({ params }: { params: { lang: string } }) {
	const lang = params.lang;
	const dict = await getDictionary(lang);

	return (
		<section className="flex flex-col items-center justify-center gap-y-4 p-4">
			<AssistantList dictionary={dict} />
			<NewAssistantForm dictionary={dict} />
		</section>
	);
}
