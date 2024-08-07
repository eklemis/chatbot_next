import { SaveInterviewUseCase } from "@/lib/interview/application/port/in/save_interview.usecase";
import { SaveInterviewConfig } from "@/config/save_interview.config";
import { SaveSummaryCommand } from "@/lib/interview/domain/save_summary.command";
export class SaveInterviewController {
	#saver: SaveInterviewUseCase;

	constructor() {
		this.#saver = SaveInterviewConfig.saveInterviewUseCase;
	}

	async saveSummary(
		user_id: string,
		assistant_id: string,
		title: string,
		summary: string
	) {
		let saveCommand = new SaveSummaryCommand(
			user_id,
			assistant_id,
			title,
			summary
		);
		const dbResponse = await this.#saver.saveSummary(saveCommand);
		if (dbResponse) {
			return new Response(JSON.stringify({ success: true }), {
				status: 200,
			});
		}
		return new Response(JSON.stringify({ success: false }), {
			status: 412,
		});
	}
}
