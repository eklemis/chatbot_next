import { SetAvatarPort } from "../../../application/port/out/set_avatar.port.out";
import prisma from "../../../../singletons/db_prisma_client";

export class PrismaSetAvatarAdapter implements SetAvatarPort {
	async insertOrUpdate(avatar_id: string, image_url: string): Promise<boolean> {
		try {
			let assistantAvatar = await prisma.assistantInfo.upsert({
				where: {
					assistantId: avatar_id,
				},
				update: {
					avatarUrl: image_url,
				},
				create: {
					assistantId: avatar_id,
					avatarUrl: image_url,
				},
			});
			if (assistantAvatar === null) {
				return false; // Handle the case where upsert returns null
			}

			return true;
		} catch (error) {
			console.error("Failed set avatar: ", error);
			return false; // Return false if there is an error
		}
	}
}
