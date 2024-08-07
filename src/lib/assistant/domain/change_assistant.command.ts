export class ChangeAssistantCommand {
	id: string;
	name: string;
	model: string;
	instruction: string;
	description: string;
	tools: string[];
	top_p: number;
	temperature: number;

	private static readonly allowedModels = ["gpt-4o", "gpt-4", "gpt-3.5-turbo"];
	private static readonly urlPattern =
		/^(https?:\/\/.*\.(?:png|jpg|svg)(\?.*)?)$/i;

	constructor(
		id: string,
		name: string, // cannot be empty
		model: string, // one of "gpt-4o", "gpt-4", "gpt-3.5-turbo"
		instruction: string,
		description: string,
		tools: string[],
		top_p: number,
		temperature: number
	) {
		if (!name) {
			throw new Error("Name cannot be empty");
		}

		if (!ChangeAssistantCommand.allowedModels.includes(model)) {
			throw new Error(
				`Model must be one of: ${ChangeAssistantCommand.allowedModels.join(
					", "
				)}`
			);
		}
		if (!tools) {
			throw new Error("Tools should be provided even if empty.");
		}

		this.id = id;
		this.name = name;
		this.model = model;
		this.instruction = instruction;
		this.description = description;
		this.tools = tools;
		this.top_p = top_p;
		this.temperature = temperature;
	}
}
