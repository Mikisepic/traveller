import { AxiosError } from 'axios';

import {
	apiDelete,
	apiGet,
	apiPatch,
	apiPost,
} from '@traveller-ui/services/api';
import { store } from '@traveller-ui/store';
import { PaginatedList } from '@traveller-ui/types';

import {
	setNotification,
	setNotificationError,
	setNotifications,
} from '../store';
import { Notification, NotificationPayload } from '../types';

export const fetchNotifications = async (page = 1) => {
	try {
		const response = await apiGet<PaginatedList<Notification>>(
			`/api/notifications?page=${page}`,
		);
		store.dispatch(setNotifications(response || []));
	} catch (error) {
		store.dispatch(setNotificationError((error as AxiosError).message));
	}
};

export const createNotification = async (payload: NotificationPayload) => {
	try {
		const response = await apiPost<Notification>(
			`/api/notifications/`,
			payload,
		);
		store.dispatch(setNotification(response || null));
	} catch (error) {
		store.dispatch(setNotificationError((error as AxiosError).message));
	}
};

export const updateNotification = async (
	id: string,
	payload: NotificationPayload,
) => {
	try {
		const response = await apiPatch<Notification>(
			`/api/notifications/${id}/`,
			payload,
		);
		store.dispatch(setNotification(response || null));
	} catch (error) {
		store.dispatch(setNotificationError((error as AxiosError).message));
	}
};

export const deleteNotification = async (id: string) => {
	try {
		const response = await apiDelete<Notification>(`/api/notifications/${id}/`);
		store.dispatch(setNotification(response || null));
	} catch (error) {
		store.dispatch(setNotificationError((error as AxiosError).message));
	}
};
