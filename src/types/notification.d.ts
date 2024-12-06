import { User } from "./user";
export interface NotificationType {
	_id: string;
	title: string;
	content: string;
	is_read: boolean;
	createdAt: Date;
	path: "maintenances" | "properties" | "tenants" | "user";
	ref: string;
}

export interface NotificationListProps {
	data: NotificationType[];
	meta: { unread: number };
	setPage: Dispatch<SetStateAction<number>>;
	setState: Dispatch<SetStateAction<"all" | "unread" | "read">>;
	state: "all" | "unread" | "read";
	onReadNotification: (id) => void;
	onReadAllNotifications: () => void;
	user: User;
	isFetchingMore: boolean;

	hasMore: boolean;

	fetchMore: any;
}
