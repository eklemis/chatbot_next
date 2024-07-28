import { CreateInterviewService } from "@/lib/interview/domain/create_interview.service";
import { OpenAiCreateInterviewAdapter } from "@/lib/interview/adapter/out/rest/openai_createthread.adapter.out";

export const CreateInterviewConfig = {
	createInterviewUseCase: new CreateInterviewService(
		new OpenAiCreateInterviewAdapter()
	),
};
