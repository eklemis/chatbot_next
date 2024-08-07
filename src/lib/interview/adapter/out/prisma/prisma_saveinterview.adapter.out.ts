import { SaveInterviewPort } from "../../../application/port/out/save_interview.port.out";
import prisma from "../../../../singletons/db_prisma_client";

export class PrismaSaveInterviewAdapter implements SaveInterviewPort {
	async save(
		user_id: string,
		assistant_id: string,
		title: string,
		summary: string
	): Promise<boolean> {
		let createdSummary = await prisma.interviewSummary.create({
			data: {
				userId: user_id,
				assistantId: assistant_id,
				title: title,
				summary: summary,
			},
		});
		if (createdSummary) {
			return Promise.resolve(true);
		}
		return Promise.resolve(false);
	}
}
