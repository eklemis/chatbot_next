export interface SetAvatarPort {
	insertOrUpdate(avatar_id: string, image_url: string): Promise<boolean>;
}
