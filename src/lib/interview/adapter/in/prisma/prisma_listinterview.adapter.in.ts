import prisma from "@/lib/singletons/db_prisma_client";

export class PrismaListInterview {
	async load(start: number, limit: number) {
		const skip = start;
		const take = limit;
		const result = await prisma.interviewSummary.findMany({
			skip,
			take,
		});
		return result;
	}
	async getCountAll(): Promise<number> {
		return prisma.interviewSummary.count();
	}
}
