import prisma from "@/lib/singletons/db_prisma_client";

export class PrismaLoadInterview {
	async load(id: string) {
		const result = await prisma.interviewSummary.findUnique({
			where: {
				id: id,
			},
		});
		return result;
	}
}
