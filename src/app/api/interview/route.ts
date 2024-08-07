import { CreateInterviewController } from "@/lib/interview/adapter/in/rest/create_interview.controller";
import { SaveInterviewController } from "@/lib/interview/adapter/in/rest/save_interview.controller";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
	let interviewCreator = new CreateInterviewController();
	let interviewObj = await interviewCreator.createInterviewSession();

	return new Response(JSON.stringify({ interview_id: interviewObj.id }), {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
}
export async function POST(request: Request) {
	const reqData = await request.json();
	const data = {
		user_id: "unknown",
		assistant_id: reqData.assistant_id,
		title: reqData.title,
		summary: reqData.summary,
	};
	const saveController = new SaveInterviewController();
	const saveResult = await saveController.saveSummary(
		data.user_id,
		data.assistant_id,
		data.title,
		data.summary
	);
	return saveResult;
}
