export interface Assistant {
	id: string | undefined | null;
	name: string;
	model: string;
	instruction: string;
	description: string;
	tools: string[];
	top_p: number;
	temperature: number;
}
