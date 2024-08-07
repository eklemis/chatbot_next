import supabase from "../../../../singletons/db_supabase_client";
import { SaveInterviewPort } from "../../../application/port/out/save_interview.port.out";

class SupabaseSaveInterviewAdapter implements SaveInterviewPort {
	async save(
		user_id: string,
		assistant_id: string,
		summary: string
	): Promise<boolean> {
		const { data, error } = await supabase
			.from("InterviewSummary")
			.insert([
				{
					assistantId: assistant_id,
					userId: user_id,
					summary: summary,
				},
			])
			.select();
		if (error) {
			return Promise.resolve(false);
		}
		return Promise.resolve(true);
	}
}
