import { Base } from '@traveller-ui/types';

export interface NotificationPayload {
	title: string;
	description: string;
}

export interface Notification extends Base, NotificationPayload {}
