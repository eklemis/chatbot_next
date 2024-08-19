import { NextResponse } from "next/server";
import { PrismaListInterview } from "@/lib/interview/adapter/in/prisma/prisma_listinterview.adapter.in";
import { SaveInterviewController } from "@/lib/interview/adapter/in/rest/save_interview.controller";

export async function GET(request: Request) {
	try {
		const inteviewLister = new PrismaListInterview();
		const interviewRows = await inteviewLister.load(0, 20);
		return NextResponse.json(interviewRows);
	} catch (error) {
		console.error("Error in GET /api/interviews:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
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
