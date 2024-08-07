export interface SaveInterviewPort {
	save(
		user_id: string,
		assistant_id: string,
		title: string,
		summary: string
	): Promise<boolean>;
}
