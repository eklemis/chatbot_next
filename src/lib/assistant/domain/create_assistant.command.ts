export class CreateAssistantCommand {
	name: string;
	model: string;
	instruction: string;
	description: string;
	tools: string[];
	avatar: string;
	top_p: number;
	temperature: number;

	private static readonly allowedModels = ["gpt-4o", "gpt-4", "gpt-3.5-turbo"];
	private static readonly urlPattern =
		/^(https?:\/\/.*\.(?:png|jpg|svg)(\?.*)?)$/i;

	constructor(
		name: string, // cannot be empty
		model: string, // one of "gpt-4o", "gpt-4", "gpt-3.5-turbo"
		instruction: string,
		description: string,
		tools: string[],
		avatar: string, // valid URL to a .jpg or .png or .svg file
		top_p: number,
		temperature: number
	) {
		console.log("Command Create Assistant => Called!");
		if (!name) {
			throw new Error("Name cannot be empty");
		}

		if (!CreateAssistantCommand.allowedModels.includes(model)) {
			throw new Error(
				`Model must be one of: ${CreateAssistantCommand.allowedModels.join(
					", "
				)}`
			);
		}

		if (!CreateAssistantCommand.urlPattern.test(avatar)) {
			throw new Error(
				"Avatar must be a valid URL to a .jpg, .png, or .svg file"
			);
		}

		this.name = name;
		this.model = model;
		this.instruction = instruction;
		this.description = description;
		this.tools = tools;
		this.avatar = avatar;
		this.top_p = top_p;
		this.temperature = temperature;
	}
}
