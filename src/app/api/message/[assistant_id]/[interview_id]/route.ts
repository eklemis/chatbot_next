import { SendMessageController } from "@/lib/interview/adapter/in/rest/send_message.controller";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

type Params = {
	assistant_id: string;
	interview_id: string;
};

export async function POST(request: Request, context: { params: Params }) {
	const assistant_id = context.params.assistant_id;
	const interview_id = context.params.interview_id;

	const messageObj = await request.json();
	let message: string = messageObj.message;

	const messanger = new SendMessageController();
	try {
		const createdMessage = await messanger.putMessage(
			interview_id,
			message,
			"user"
		);

		return NextResponse.json(createdMessage);
	} catch (error) {
		console.error("Error creating new message:", error);
		return new Response("Error initiating new message", { status: 500 });
	}
}

export async function GET(request: Request, context: { params: Params }) {
	const assistant_id = context.params.assistant_id;
	const interview_id = context.params.interview_id;

	const adapter = new SendMessageController();

	try {
		const stream = await adapter.fetchReplyStream(assistant_id, interview_id);
		// Transform the stream to include SSE formatting
		const transformedStream = new ReadableStream({
			async start(controller) {
				const reader = stream.getReader();
				const encoder = new TextEncoder();

				try {
					while (true) {
						const { done, value } = await reader.read();
						if (done) {
							controller.enqueue(encoder.encode("data: completed\n\n"));
							break;
						}
						// Ensure the value is a string
						const stringValue =
							typeof value === "string" ? value : JSON.stringify(value);
						controller.enqueue(encoder.encode(`data: ${stringValue}\n\n`));
					}
				} catch (error) {
					console.error("Stream error:", error);
					controller.error(error);
				} finally {
					controller.close();
					reader.releaseLock();
				}
			},
		});

		return new Response(transformedStream, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});
	} catch (error) {
		console.error("Error getting stream reply:", error);
		return new Response("Error getting stream reply", { status: 500 });
	}
}
