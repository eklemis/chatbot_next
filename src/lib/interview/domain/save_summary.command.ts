export class SaveSummaryCommand {
	#userId: string;
	#assistantId: string;
	#title: string;
	#summary: string;
	constructor(
		user_id: string,
		assistant_id: string,
		title: string,
		summary: string
	) {
		this.#userId = user_id;
		this.#assistantId = assistant_id;
		this.#title = title;
		this.#summary = summary;
	}
	getUserId(): string {
		return this.#userId;
	}
	getAssistantId(): string {
		return this.#assistantId;
	}
	getTittle(): string {
		return this.#title;
	}
	getSummary(): string {
		return this.#summary;
	}
}
