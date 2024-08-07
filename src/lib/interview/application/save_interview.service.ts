import { SaveSummaryCommand } from "../domain/save_summary.command";
import { SaveInterviewUseCase } from "./port/in/save_interview.usecase";
import { SaveInterviewPort } from "./port/out/save_interview.port.out";
export class SaveInterviewService implements SaveInterviewUseCase {
	#savePort: SaveInterviewPort;

	constructor(savePort: SaveInterviewPort) {
		this.#savePort = savePort;
	}

	saveSummary(command: SaveSummaryCommand): Promise<boolean> {
		return this.#savePort.save(
			command.getUserId(),
			command.getAssistantId(),
			command.getTittle(),
			command.getSummary()
		);
	}
}
