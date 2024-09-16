import { describe, it, expect, vi, beforeEach } from "vitest";
import { ListAssistantcontroller } from "./list_assistant.controller";
import { ListAssistantUseCase } from "../../application/port/in/list_assistant.usecase";
import { Assistant } from "../../domain/assistant";

// Mock the ListAssistantConfig
vi.mock("@/config/list_assistant.config", () => ({
	ListAssistantConfig: {
		listAssistantUseCase: {
			listAssistant: vi.fn(),
		},
	},
}));

// Import the mocked module
import { ListAssistantConfig } from "@/config/list_assistant.config";

describe("ListAssistantcontroller", () => {
	let controller: ListAssistantcontroller;
	let mockListAssistantUseCase: ListAssistantUseCase;

	beforeEach(() => {
		controller = new ListAssistantcontroller();
		mockListAssistantUseCase = ListAssistantConfig.listAssistantUseCase;
		vi.clearAllMocks();
	});

	it("should call listAssistant with the correct parameters and return assistants", async () => {
		const limit = 10;
		const before_id = "before123";
		const after_id = "after456";
		const mockAssistants: Assistant[] = [
			{
				id: "1",
				name: "Assistant 1",
				model: "gpt-3.5-turbo",
				description: "A helpful assistant",
				instruction: "Be polite and concise",
				tools: ["web_search", "calculator"],
				avatar: "avatar1.png",
				top_p: 0.9,
				temperature: 0.7,
			},
			{
				id: "2",
				name: "Assistant 2",
				model: "gpt-4",
				description: "An advanced assistant",
				instruction: "Provide detailed explanations",
				tools: ["code_interpreter", "image_analysis"],
				avatar: "avatar2.png",
				top_p: 0.95,
				temperature: 0.8,
			},
		];

		vi.mocked(mockListAssistantUseCase.listAssistant).mockResolvedValue(
			mockAssistants
		);

		const result = await controller.fetchAssistant(limit, before_id, after_id);

		expect(mockListAssistantUseCase.listAssistant).toHaveBeenCalledWith(
			limit,
			before_id,
			after_id
		);
		expect(result).toEqual(mockAssistants);
	});

	it("should handle empty result", async () => {
		vi.mocked(mockListAssistantUseCase.listAssistant).mockResolvedValue([]);

		const result = await controller.fetchAssistant(5, "", "");

		expect(mockListAssistantUseCase.listAssistant).toHaveBeenCalledWith(
			5,
			"",
			""
		);
		expect(result).toEqual([]);
	});

	it("should propagate errors from listAssistant", async () => {
		const errorMessage = "Failed to fetch assistants";
		vi.mocked(mockListAssistantUseCase.listAssistant).mockRejectedValue(
			new Error(errorMessage)
		);

		await expect(controller.fetchAssistant(5, "", "")).rejects.toThrow(
			errorMessage
		);
	});

	it("should handle assistants with undefined id", async () => {
		const mockAssistants: Assistant[] = [
			{
				id: undefined,
				name: "New Assistant",
				model: "gpt-3.5-turbo",
				description: "A newly created assistant",
				instruction: "Assist with general tasks",
				tools: [],
				avatar: "default_avatar.png",
				top_p: 1,
				temperature: 0.5,
			},
		];

		vi.mocked(mockListAssistantUseCase.listAssistant).mockResolvedValue(
			mockAssistants
		);

		const result = await controller.fetchAssistant(1, "", "");

		expect(result).toEqual(mockAssistants);
		expect(result[0].id).toBeUndefined();
	});
});
