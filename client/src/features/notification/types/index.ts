import { Base, PaginatedList } from '@traveller-ui/types';

export interface NotificationPayload {
	title: string;
	description: string;
}

export interface Notification extends Base, NotificationPayload {}

export interface NotificationState {
	notifications: PaginatedList<Notification>;
	notification: Notification | null;
	loading: boolean;
	error: string | null;
}
