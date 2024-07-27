import { OpenAiCreateThreadAdapter } from "@/lib/message/adapter/out/rest/openai_createthread.adapter.out";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
	let interviewCreator = new OpenAiCreateThreadAdapter();
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
