import { NextResponse } from "next/server";
import { PrismaListInterview } from "@/lib/interview/adapter/in/prisma/prisma_listinterview.adapter.in";

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
