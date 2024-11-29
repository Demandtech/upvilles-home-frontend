import { User } from "./user";

export interface SessionId {
	_id: string;
	active: boolean;
	admin: User;
	user: User;
}

export interface ChatType {
	_id: string;
	message: string | null;
	sender: Partial<User>;
	image: ImageUrl;
	session_id: SessionId | null;
}
