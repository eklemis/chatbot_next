import { describe, it, expect, vi, beforeEach } from "vitest";
import { ChangeAssistantController } from "./change_assistant.controller";
import { Assistant } from "../../application/port/in/assistant";
import { ChangeAssistantCommand } from "../../domain/change_assistant.command";

vi.mock("@/config/change_assistant.config", () => ({
	ChangeAssistantConfig: {
		changeAssistantUseCase: {
			update: vi.fn(),
			loadAssistant: vi.fn(),
		},
	},
}));
import { ChangeAssistantConfig } from "@/config/change_assistant.config";
describe("ChangeAssistantController", () => {
	let controller: ChangeAssistantController;
	const mockChangeUseCase = ChangeAssistantConfig.changeAssistantUseCase;

	beforeEach(() => {
		vi.clearAllMocks();
		controller = new ChangeAssistantController();
	});

	describe("loadAssistant", () => {
		it("should call loadAssistant on the use case and return the result", async () => {
			const mockAssistant: Assistant = {
				id: "xyz",
				name: "Test Assistant",
				model: "gpt-3.5-turbo",
				instruction: "Be helpful",
				description: "A test assistant",
				tools: ["web_search"],
				top_p: 0.9,
				temperature: 0.7,
			};
			vi.mocked(mockChangeUseCase.loadAssistant).mockResolvedValue(
				mockAssistant
			);

			const result = await controller.loadAssistant("xyz");

			expect(mockChangeUseCase.loadAssistant).toHaveBeenCalledWith("xyz");
			expect(result).toEqual(mockAssistant);
		});
	});
	describe("applyChange", () => {
		it("should create a ChangeAssistantCommand and call update on the use case", async () => {
			vi.mocked(mockChangeUseCase.update).mockResolvedValue(true);

			const result = await controller.applyChange(
				"1",
				"New Name",
				"gpt-4",
				"New Instruction",
				"New Description",
				0.7,
				0.9
			);

			expect(mockChangeUseCase.update).toHaveBeenCalledWith(
				expect.objectContaining({
					id: "1",
					name: "New Name",
					model: "gpt-4",
					instruction: "New Instruction",
					description: "New Description",
					temperature: 0.7,
					top_p: 0.9,
					tools: [],
				} as ChangeAssistantCommand)
			);
			expect(result).toBe(true);
		});
	});
});
