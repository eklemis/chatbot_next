import { SaveSummaryCommand } from "../../../domain/save_summary.command";
export interface SaveInterviewUseCase {
	saveSummary(command: SaveSummaryCommand): Promise<boolean>;
}
