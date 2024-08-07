import { SetAvatarCommand } from "../../../domain/set_avatar.command";
export interface SetAvatarUseCase {
	setAvatar(setAvatarCommand: SetAvatarCommand): Promise<boolean>;
}
