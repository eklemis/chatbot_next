import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { LoadAssistantController } from "./load_assistant.controller";
import { LoadAssistantQuery } from "../../application/port/in/load_assistant.query";
import { LoadAssistantConfig } from "@/config/load_assistant.config";

// Mock the LoadAssistantQuery
const mockLoadAssistantQuery: LoadAssistantQuery = {
	loadAssistant: vi.fn(),
	getName: vi.fn(),
	getDescription: vi.fn(),
	getInstruction: vi.fn(),
	getModel: vi.fn(),
	getId: vi.fn(),
};

// Mock the LoadAssistantConfig to return the mocked LoadAssistantQuery
vi.mock("@/config/load_assistant.config", () => ({
	LoadAssistantConfig: {
		loadAssistantQuery: mockLoadAssistantQuery,
	},
}));

describe("LoadAssistantController", () => {
	let controller: LoadAssistantController;

	beforeEach(() => {
		controller = new LoadAssistantController();
	});

	it("should call loadAssistant with the correct id", async () => {
		const id = "test-id";
		await controller.loadAssistant(id);
		expect(mockLoadAssistantQuery.loadAssistant).toHaveBeenCalledWith(id);
	});

	it("should return the correct assistant name", () => {
		const name = "Test Assistant";
		(mockLoadAssistantQuery.getName as Mock).mockReturnValue(name);
		expect(controller.getAssistantName()).toBe(name);
	});

	it("should return the correct assistant description", () => {
		const description = "Test Description";
		(mockLoadAssistantQuery.getDescription as Mock).mockReturnValue(
			description
		);
		expect(controller.getAssistantDescription()).toBe(description);
	});

	it("should return the correct assistant instruction", () => {
		const instruction = "Test Instruction";
		(mockLoadAssistantQuery.getInstruction as Mock).mockReturnValue(
			instruction
		);
		expect(controller.getAssistantInstruction()).toBe(instruction);
	});

	it("should return the correct model", () => {
		const model = "Test Model";
		(mockLoadAssistantQuery.getModel as Mock).mockReturnValue(model);
		expect(controller.getModel()).toBe(model);
	});
});
