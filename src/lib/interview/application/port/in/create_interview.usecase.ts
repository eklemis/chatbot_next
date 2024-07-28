import { Interview } from "@/lib/interview/domain/interview";
export interface CreateInterviewUseCase {
	createInterviewSession(): Promise<Interview>;
}
