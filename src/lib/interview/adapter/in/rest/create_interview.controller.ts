import { CreateInterviewUseCase } from "@/lib/interview/application/port/in/create_interview.usecase";
import { CreateInterviewConfig } from "@/config/create_interview.config";
import { Interview } from "@/lib/interview/domain/interview";

export class CreateInterviewController {
	#interviewCreator: CreateInterviewUseCase;
	constructor() {
		this.#interviewCreator = CreateInterviewConfig.createInterviewUseCase;
	}

	createInterviewSession(): Promise<Interview> {
		return this.#interviewCreator.createInterviewSession();
	}
}
