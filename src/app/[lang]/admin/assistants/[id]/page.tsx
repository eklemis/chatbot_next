// Serve View and Edit of an Assistant
import { getDictionary } from "../../../dictionaries";
import { EditAssistantForm } from "../../_forms/edit-assistant";
import { ViewAssistant } from "../../_views/view-assistant";
import { ChangeAssistantController } from "@/lib/assistant/adapter/in/change_assistant.controller";
import { Assistant } from "@/lib/assistant/application/port/in/assistant";

export default async function Page({
	params,
	searchParams,
}: {
	params: { lang: string; id: string };
	searchParams: { edit?: string };
}) {
	const isEditing = searchParams.edit === "true";

	const lang = params.lang;
	const assistant_id = params.id;

	const dict = await getDictionary(lang); // en
	const assistantChangeController = new ChangeAssistantController();
	const loadedAssistant: Assistant =
		await assistantChangeController.loadAssistant(assistant_id);

	return (
		<section className="w-full p-0 md:p-8 flex flex-col items-center">
			{isEditing ? (
				<EditAssistantForm
					dictionary={dict}
					assistant={loadedAssistant}
					assistant_id={assistant_id}
				/>
			) : (
				<ViewAssistant
					assistant_id={assistant_id}
					dictionary={dict}
					assistant={loadedAssistant}
				/>
			)}
		</section>
	);
}
