import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateAssistantController } from "./create_assistant.controller";
import { CreateAssistantUseCase } from "../../application/port/in/create_assistant.usecase";
import { Assistant } from "../../domain/assistant";
import { CreateAssistantCommand } from "../../domain/create_assistant.command";

// Mock the CreateAssistantConfig
vi.mock("@/config/create_assistant.config", () => ({
	CreateAssistantConfig: {
		createAssistantUseCase: {
			createAssistant: vi.fn(),
		},
	},
}));

// Import the mocked module
// Will import from the mocked version above
import { CreateAssistantConfig } from "@/config/create_assistant.config";

describe("CreateAssistantController", () => {
	let controller: CreateAssistantController;
	let mockCreateAssistantUseCase: CreateAssistantUseCase;

	beforeEach(() => {
		controller = new CreateAssistantController();
		mockCreateAssistantUseCase = CreateAssistantConfig.createAssistantUseCase;
		vi.clearAllMocks();
	});

	it("should call createAssistant with the correct CreateAssistantCommand", async () => {
		const mockAssistant: Assistant = {
			id: "new-id",
			name: "Test Assistant",
			model: "gpt-3.5-turbo",
			instruction: "Be helpful",
			description: "A test assistant",
			tools: ["web_search"],
			avatar: "https://example.com/avatar.png",
			top_p: 0.9,
			temperature: 0.7,
		};

		vi.mocked(mockCreateAssistantUseCase.createAssistant).mockResolvedValue(
			mockAssistant
		);

		const result = await controller.postAssistant(
			mockAssistant.name,
			mockAssistant.model,
			mockAssistant.instruction,
			mockAssistant.description,
			mockAssistant.tools,
			mockAssistant.avatar,
			mockAssistant.top_p,
			mockAssistant.temperature
		);

		expect(mockCreateAssistantUseCase.createAssistant).toHaveBeenCalledWith(
			expect.any(CreateAssistantCommand)
		);

		const calledWith = vi.mocked(mockCreateAssistantUseCase.createAssistant)
			.mock.calls[0][0];
		expect(calledWith).toEqual(
			new CreateAssistantCommand(
				mockAssistant.name,
				mockAssistant.model,
				mockAssistant.instruction,
				mockAssistant.description,
				mockAssistant.tools,
				mockAssistant.avatar,
				mockAssistant.top_p,
				mockAssistant.temperature
			)
		);

		expect(result).toEqual(mockAssistant);
	});

	it("should handle creation of assistant with minimum required fields", async () => {
		const minimalAssistant: Assistant = {
			id: "minimal-id",
			name: "Minimal Assistant",
			model: "gpt-3.5-turbo",
			instruction: "Minimal instruction",
			description: "",
			tools: [],
			avatar: "https://example.com/avatar.png",
			top_p: 1,
			temperature: 0.5,
		};

		vi.mocked(mockCreateAssistantUseCase.createAssistant).mockResolvedValue(
			minimalAssistant
		);

		const result = await controller.postAssistant(
			minimalAssistant.name,
			minimalAssistant.model,
			minimalAssistant.instruction,
			minimalAssistant.description,
			minimalAssistant.tools,
			minimalAssistant.avatar,
			minimalAssistant.top_p,
			minimalAssistant.temperature
		);

		expect(result).toEqual(minimalAssistant);
		expect(mockCreateAssistantUseCase.createAssistant).toHaveBeenCalledWith(
			expect.any(CreateAssistantCommand)
		);
	});

	it("should propagate errors from createAssistant", async () => {
		const errorMessage = "Failed to create assistant";
		vi.mocked(mockCreateAssistantUseCase.createAssistant).mockRejectedValue(
			new Error(errorMessage)
		);

		await expect(
			controller.postAssistant(
				"Test",
				"gpt-3.5-turbo",
				"Instruction",
				"Description",
				[],
				"https://example.com/avatar.jpg",
				1,
				0.5
			)
		).rejects.toThrow(errorMessage);
	});
});
