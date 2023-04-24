import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	Notification,
	NotificationPayload,
} from '@traveller-ui/components/notification';
import { RootState } from '../../store';
import {
	createNotificationAction,
	deleteNotificationAction,
	fetchNotificationAction,
	fetchNotificationsAction,
} from './notification.actions';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { PaginatedList } from '@traveller-ui/types';

interface NotificationState {
	notifications: PaginatedList<Notification>;
	notification: Notification | null;
	loading: boolean;
	error: string | null;
}

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
	name: 'NOTIFICATION API',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotifications.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchNotifications.fulfilled,
				(state, action: PayloadAction<PaginatedList<Notification>>) => {
					state.notifications = action.payload;
					state.loading = false;
					state.error = null;
				},
			)
			.addCase(fetchNotifications.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchNotification.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchNotification.fulfilled,
				(state, action: PayloadAction<Notification>) => {
					state.notification = action.payload;
					state.loading = false;
					state.error = null;
				},
			)
			.addCase(fetchNotification.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(createNotification.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				createNotification.fulfilled,
				(state, action: PayloadAction<Notification>) => {
					state.notifications.results.push(action.payload);
					state.notification = action.payload;
					state.loading = false;
					state.error = null;
				},
			)
			.addCase(createNotification.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(deleteNotification.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				deleteNotification.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.notifications.results = state.notifications.results.filter(
						(p) => p.id !== action.payload,
					);
					state.notification = null;
					state.loading = false;
					state.error = null;
				},
			)
			.addCase(deleteNotification.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const fetchNotifications = createAsyncThunk(
	fetchNotificationsAction.type,
	async (_, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<PaginatedList<Notification>> =
				await axios.get(
					`${(import.meta as any).env.VITE_BACKEND_API}/api/notifications/`,
				);
			return response.data;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const fetchNotification = createAsyncThunk<Notification, string>(
	fetchNotificationAction.type,
	async (id, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Notification> = await axios.get(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/notifications/${id}`,
			);
			return response.data;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const createNotification = createAsyncThunk<
	Notification,
	NotificationPayload
>(createNotificationAction.type, async (payload, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<Notification> = await axios.post(
			`${(import.meta as any).env.VITE_BACKEND_API}/api/notifications/`,
			payload,
		);
		return response.data;
	} catch (error) {
		return rejectWithValue((error as AxiosError).message);
	}
});

export const deleteNotification = createAsyncThunk<string, string>(
	deleteNotificationAction.type,
	async (id, { rejectWithValue }) => {
		try {
			await axios.delete(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/notifications/${id}`,
			);
			return id;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const selectNotifications = (state: RootState) =>
	state.notification.notifications;
export const selectNotification = (state: RootState) =>
	state.notification.notification;
export const selectNotificationLoading = (state: RootState) =>
	state.notification.loading;
export const selectNotificationError = (state: RootState) =>
	state.notification.error;

export default notificationSlice.reducer;
