import { Assistant } from "../../domain/assistant";
import { ListAssistantPort } from "../../application/port/in/list_assistant.port.in";
import { AssistantListParams } from "openai/resources/beta/assistants.mjs";
import { aIAssistantsToAssistants } from "./openai.assistant.mapper";

import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

function getCleanParams(
	limit: number,
	before_id: string,
	after_id: string
): AssistantListParams {
	const DEFAULT_LIMIT = 20;
	let parameters: AssistantListParams = {
		order: "desc",
	};
	parameters["limit"] = limit > 0 ? limit : DEFAULT_LIMIT;
	parameters["before"] = before_id ? before_id : undefined;
	parameters["after"] = after_id ? after_id : undefined;

	return parameters;
}

export class OpenAIListAssistantAdapter implements ListAssistantPort {
	async listAssistant(
		limit: number,
		before_id: string,
		after_id: string
	): Promise<Assistant[]> {
		let parameters: AssistantListParams = getCleanParams(
			limit,
			before_id,
			after_id
		);

		const myAssistants = await openai.beta.assistants.list({ ...parameters });

		let assistants: Assistant[] = aIAssistantsToAssistants(myAssistants.data);

		return Promise.resolve(assistants);
	}
}
