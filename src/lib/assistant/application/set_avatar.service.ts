import { SetAvatarCommand } from "../domain/set_avatar.command";
import { SetAvatarUseCase } from "./port/in/set_avatar.usecase";
import { SetAvatarPort } from "./port/out/set_avatar.port.out";

export class SetAvatarService implements SetAvatarUseCase {
	#setAvatarPort: SetAvatarPort;

	constructor(setAvatarPort: SetAvatarPort) {
		this.#setAvatarPort = setAvatarPort;
	}

	async setAvatar(setAvatarCommand: SetAvatarCommand): Promise<boolean> {
		return this.#setAvatarPort.insertOrUpdate(
			setAvatarCommand.getAssistantId(),
			setAvatarCommand.getImageUrl()
		);
	}
}
