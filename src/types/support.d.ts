import { User } from "./user";

export interface ChatType {
	_id: string;
	message: string | null;
	sender: Partial<User>;
	image: ImageUrl;
}
