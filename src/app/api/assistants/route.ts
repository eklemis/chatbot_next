import { Assistant } from "@/lib/assistant/domain/assistant";
import { CreateAssistantController } from "@/lib/assistant/adapter/in/create_assistant.controller";
import { ListAssistantcontroller } from "@/lib/assistant/adapter/in/list_assistant.controller";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	let limit: number = Number(request.nextUrl.searchParams.get("limit"));
	let before_id = request.nextUrl.searchParams.get("before_id");
	let after_id = request.nextUrl.searchParams.get("after_id");

	let laController: ListAssistantcontroller = new ListAssistantcontroller();
	let assistants: Assistant[] = await laController.fetchAssistant(
		limit ? limit : 20,
		before_id ? before_id : "",
		after_id ? after_id : ""
	);
	return NextResponse.json(assistants);
}
export async function POST(request: Request) {
	let caController: CreateAssistantController = new CreateAssistantController();
	const reqBody = await request.json();
	let da: Assistant = {
		id: undefined,
		name: reqBody.name,
		model: reqBody.model,
		instruction: reqBody.instruction,
		description: reqBody.description,
		tools: [],
		avatar: reqBody.avatar
			? reqBody.avatar
			: "https://cdn.pixabay.com/photo/2023/03/15/09/32/woman-7854120_1280.png",
		top_p: reqBody.top_p,
		temperature: reqBody.temperature,
	};
	let assistant: Assistant = await caController.postAssistant(
		da.name,
		da.model,
		da.instruction,
		da.description,
		da.tools,
		da.avatar,
		da.top_p,
		da.temperature
	);

	return NextResponse.json(assistant);
}
