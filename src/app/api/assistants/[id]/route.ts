import { NextResponse } from "next/server";
import { ChangeAssistantController } from "../../../../lib/assistant/adapter/in/change_assistant.controller";
type Params = {
	id: string;
};
type Assistant = {
	id: string;
	name: string;
	model: string;
	description: string;
	instruction: string;
	top_p: number;
	temperature: number;
};
export async function PUT(request: Request, context: { params: Params }) {
	const id: string = context.params.id;

	const reqBody = await request.json();
	const changedAssistant: Assistant = {
		id: id,
		name: reqBody.name,
		model: reqBody.model,
		description: reqBody.description,
		instruction: reqBody.instruction,
		top_p: reqBody.top_p,
		temperature: reqBody.temperature,
	};

	const assistantChanger = new ChangeAssistantController();
	const result = await assistantChanger.applyChange(
		changedAssistant.id,
		changedAssistant.name,
		changedAssistant.model,
		changedAssistant.instruction,
		changedAssistant.description,
		changedAssistant.temperature,
		changedAssistant.top_p
	);

	return NextResponse.json({ result: result });
}
