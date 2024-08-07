export class SetAvatarCommand {
	#assistantId: string;
	#imageUrl: string;
	constructor(assistant_id: string, image_url: string) {
		this.#assistantId = assistant_id;
		this.#imageUrl = image_url;
	}
	getAssistantId(): string {
		return this.#assistantId;
	}
	getImageUrl(): string {
		return this.#imageUrl;
	}
}
