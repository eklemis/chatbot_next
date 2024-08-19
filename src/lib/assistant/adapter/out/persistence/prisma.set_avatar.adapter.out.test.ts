import { describe, it, expect, beforeEach, vi } from "vitest";
import { PrismaSetAvatarAdapter } from "./prisma.set_avatar.adapter.out";
import prisma from "../../../../singletons/db_prisma_client";

// Mock the prisma client
vi.mock("../../../../singletons/db_prisma_client", () => ({
	default: {
		assistantInfo: {
			upsert: vi.fn(),
		},
	},
}));

describe("PrismaSetAvatarAdapter", () => {
	let adapter: PrismaSetAvatarAdapter;

	beforeEach(() => {
		adapter = new PrismaSetAvatarAdapter();
		vi.resetAllMocks();
	});

	it("should successfully insert or update an avatar", async () => {
		const mockUpsert = vi.mocked(prisma.assistantInfo.upsert);
		mockUpsert.mockResolvedValue({
			assistantId: "test-id",
			avatarUrl: "test-url",
		});

		const result = await adapter.insertOrUpdate("test-id", "test-url");

		expect(result).toBe(true);
		expect(mockUpsert).toHaveBeenCalledWith({
			where: { assistantId: "test-id" },
			update: { avatarUrl: "test-url" },
			create: { assistantId: "test-id", avatarUrl: "test-url" },
		});
	});

	it("should return false when upsert fails", async () => {
		const mockUpsert = vi.mocked(prisma.assistantInfo.upsert);
		mockUpsert.mockRejectedValue(new Error("Database error"));

		const consoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});

		const result = await adapter.insertOrUpdate("test-id", "test-url");

		expect(result).toBe(false);
		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"Failed set avatar: ",
			expect.any(Error)
		);

		consoleErrorSpy.mockRestore();
	});

	it("should return false when upsert returns null", async () => {
		const mockUpsert = vi.mocked(prisma.assistantInfo.upsert);
		mockUpsert.mockResolvedValue(null as any);

		const result = await adapter.insertOrUpdate("test-id", "test-url");

		expect(result).toBe(false);
	});
});
