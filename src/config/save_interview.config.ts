import { SaveInterviewService } from "@/lib/interview/application/save_interview.service";
import { PrismaSaveInterviewAdapter } from "@/lib/interview/adapter/out/prisma/prisma_saveinterview.adapter.out";
export const SaveInterviewConfig = {
	saveInterviewUseCase: new SaveInterviewService(
		new PrismaSaveInterviewAdapter()
	),
};
