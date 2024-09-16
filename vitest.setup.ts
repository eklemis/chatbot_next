// vitest.setup.ts
import { vi } from "vitest";

// Mock the Core.readEnv function if you use it across tests
vi.mock("@/core", () => ({
	Core: {
		readEnv: vi.fn((key: string) => {
			const envVars = {
				OPENAI_API_KEY: "test-api-key",
				OPENAI_BASE_URL: "https://api.openai.com",
				OPENAI_ORG_ID: "test-org-id",
				OPENAI_PROJECT_ID: "test-project-id",
			} as { [key: string]: string };

			return envVars[key];
		}),
	},
}));

// Mock the OpenAI client globally
vi.mock("openai", () => ({
	OpenAI: vi.fn(() => ({
		completion: {
			create: vi.fn(),
		},
	})),
}));

// vitest.setup.ts
console.log("Bun test setup file loaded");
