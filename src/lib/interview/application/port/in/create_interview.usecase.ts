import { Interview } from "./interview";
export interface CreateInterviewUseCase {
	createInterviewSession(): Promise<Interview>;
}
