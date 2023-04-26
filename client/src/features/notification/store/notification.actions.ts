import { createAction } from '@reduxjs/toolkit';

import { NotificationPayload } from '@traveller-ui/features/notification/types';

const SOURCE = 'NOTIFICATION API';

export const fetchNotificationsAction = createAction(`${SOURCE} Fetch All`);
export const fetchNotificationAction = createAction<{ id: string }>(
	`${SOURCE} Fetch One`,
);
export const createNotificationAction = createAction<{
	payload: NotificationPayload;
}>(`${SOURCE} Create One`);
export const deleteNotificationAction = createAction<{
	id: string;
}>(`${SOURCE} Delete One`);
