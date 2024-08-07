export interface ChangeAssistantPort {
	update(
		id: string,
		name: string,
		model: string,
		instruction: string,
		description: string,
		temperature: number,
		top_p: number,
		tool: string[]
	): Promise<boolean>;
}
