import { CreateAssistantService } from "@/lib/assistant/application/create_assistant.service";
import { OpenAiCreateAssistantAdapter } from "@/lib/assistant/adapter/out/openai.create_assistant.adapter.out";

export const CreateAssistantConfig = {
	createAssistantUseCase: new CreateAssistantService(
		new OpenAiCreateAssistantAdapter()
	),
};
