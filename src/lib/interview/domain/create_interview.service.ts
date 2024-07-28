import { CreateInterviewUseCase } from "../application/port/in/create_interview.usecase";
import { CreateInterviewPort } from "../application/port/out/create_interview.port.out";
import { Interview } from "./interview";

export class CreateInterviewService implements CreateInterviewUseCase {
	#createInterviewPort: CreateInterviewPort;

	constructor(interview_port: CreateInterviewPort) {
		this.#createInterviewPort = interview_port;
	}

	createInterviewSession(): Promise<Interview> {
		return this.#createInterviewPort.createInterviewSession();
	}
}
