import { OpenAiCreateAndRunAdapter } from "@/lib/message/adapter/out/rest/openai_createandrun.adapter.out";

export const dynamic = "force-dynamic"; // defaults to auto

type Params = {
	assistant_id: string;
};

export async function GET(request: Request, context: { params: Params }) {
	const assistant_id = context.params.assistant_id;
	console.log("assistant id:", assistant_id);

	const adapter = new OpenAiCreateAndRunAdapter();
	const initialMessage = "Hi, I'm Litha the former staff that just resigned."; // You might want to get this from the request

	try {
		const stream = await adapter.initiateConversation(
			assistant_id,
			initialMessage
		);

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
		console.error("Error initiating conversation:", error);
		return new Response("Error initiating conversation", { status: 500 });
	}
}
