import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
	Notification,
	NotificationState,
} from '@traveller-ui/features/notification/types';
import { RootState } from '@traveller-ui/store';
import { PaginatedList } from '@traveller-ui/types';

const SOURCE = 'NOTIFICATION API';

const initialState: NotificationState = {
	notifications: {
		count: 0,
		previous: null,
		next: null,
		results: [],
	},
	notification: null,
	loading: false,
	error: null,
};

export const notificationSlice = createSlice({
	name: SOURCE,
	initialState,
	reducers: {
		setNotifications: (
			state,
			action: PayloadAction<PaginatedList<Notification>>,
		) => {
			state.notifications = action.payload;
			state.loading = false;
			state.error = null;
		},
		setNotificationsLoading: (state) => {
			state.loading = true;
			state.error = null;
		},
		setNotification: (state, action: PayloadAction<Notification | null>) => {
			state.notification = action.payload;
			state.loading = false;
			state.error = null;
		},
		setNotificationError: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearNotificationState: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const selectNotifications = (state: RootState) =>
	state.notification.notifications;
export const selectNotification = (state: RootState) =>
	state.notification.notification;
export const selectNotificationLoading = (state: RootState) =>
	state.notification.loading;
export const selectNotificationError = (state: RootState) =>
	state.notification.error;

export const {
	setNotifications,
	setNotificationsLoading,
	setNotification,
	setNotificationError,
	clearNotificationState,
} = notificationSlice.actions;

export default notificationSlice.reducer;
