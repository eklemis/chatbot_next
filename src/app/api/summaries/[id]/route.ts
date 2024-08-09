import { NextResponse } from "next/server";
import { LoadAssistantController } from "@/lib/assistant/adapter/in/load_assistant.controller";
import { PrismaLoadInterview } from "@/lib/interview/adapter/in/prisma/prisma_loadinterview.adapter";

type Params = {
	id: string;
};
export async function GET(request: Request, context: { params: Params }) {
	const id: string = context.params.id;

	const loader = new PrismaLoadInterview();
	const summaryObj = await loader.load(id);

	const assistantId = summaryObj ? summaryObj.assistantId : "";
	const assistantLoader = new LoadAssistantController();
	await assistantLoader.loadAssistant(assistantId);

	return NextResponse.json({
		id: id,
		assistantId: summaryObj?.assistantId,
		assistantName: assistantLoader.getAssistantName(),
		title: summaryObj?.title,
		summary: summaryObj?.summary,
	});
}
