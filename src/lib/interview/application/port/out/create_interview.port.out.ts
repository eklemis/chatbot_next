import { Interview } from "@/lib/interview/domain/interview";
export interface CreateInterviewPort {
	createInterviewSession(): Promise<Interview>;
}
