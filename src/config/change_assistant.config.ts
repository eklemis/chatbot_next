import { ChangeAssistantService } from "../lib/assistant/application/change_assistant.service";
import { OpenAiChangeAssistantAdapter } from "../lib/assistant/adapter/out/openai.change_assistant.adapter.out";
import { OpenAiLoadAssistantAdapter } from "../lib/assistant/adapter/out/openai.load_assistant.adapter.out";

export const ChangeAssistantConfig = {
	changeAssistantUseCase: new ChangeAssistantService(
		new OpenAiChangeAssistantAdapter(),
		new OpenAiLoadAssistantAdapter()
	),
};
