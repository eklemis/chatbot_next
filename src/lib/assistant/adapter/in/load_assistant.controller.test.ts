import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoadAssistantController } from "./load_assistant.controller";
import { LoadAssistantQuery } from "../../application/port/in/load_assistant.query";

// Mock the LoadAssistantConfig
vi.mock("../../../../config/load_assistant.config", () => ({
	LoadAssistantConfig: {
		loadAssistantQuery: {
			loadAssistant: vi.fn(),
			getName: vi.fn(),
			getDescription: vi.fn(),
			getInstruction: vi.fn(),
			getModel: vi.fn(),
			getId: vi.fn(),
		},
	},
}));

// Import the mocked module
// Will import from the mocked version above
import { LoadAssistantConfig } from "../../../../config/load_assistant.config";

describe("LoadAssistantController", () => {
	let controller: LoadAssistantController;
	let mockLoadAssistantQuery: LoadAssistantQuery;

	beforeEach(() => {
		controller = new LoadAssistantController();
		mockLoadAssistantQuery = LoadAssistantConfig.loadAssistantQuery;
		vi.clearAllMocks();
	});

	it("should call loadAssistant with the correct id", async () => {
		const id = "test-id";
		await controller.loadAssistant(id);
		expect(mockLoadAssistantQuery.loadAssistant).toHaveBeenCalledWith(id);
	});

	it("should return the correct assistant name", () => {
		const name = "Test Assistant";
		vi.mocked(mockLoadAssistantQuery.getName).mockReturnValue(name);
		expect(controller.getAssistantName()).toBe(name);
	});

	it("should return the correct assistant description", () => {
		const description = "Test Description";
		vi.mocked(mockLoadAssistantQuery.getDescription).mockReturnValue(
			description
		);
		expect(controller.getAssistantDescription()).toBe(description);
	});

	it("should return the correct assistant instruction", () => {
		const instruction = "Test Instruction";
		vi.mocked(mockLoadAssistantQuery.getInstruction).mockReturnValue(
			instruction
		);
		expect(controller.getAssistantInstruction()).toBe(instruction);
	});

	it("should return the correct model", () => {
		const model = "Test Model";
		vi.mocked(mockLoadAssistantQuery.getModel).mockReturnValue(model);
		expect(controller.getModel()).toBe(model);
	});
});
