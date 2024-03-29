import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@traveller-ui/store';

import { AuthState, MapStyle, User } from '../types';

const SOURCE = 'AUTH API';

const initialState: AuthState = {
	loading: false,
	token: null,
	refreshToken: null,
	account: null,
	error: null,
	settings: {
		mapStyle: MapStyle.LightV11,
	},
};

const authSlice = createSlice({
	name: SOURCE,
	initialState,
	reducers: {
		setAuthTokens: (
			state,
			action: PayloadAction<{ token: string; refreshToken: string }>,
		) => {
			state.loading = false;
			state.refreshToken = action.payload.refreshToken;
			state.token = action.payload.token;
			state.error = null;
		},
		setLoading: (state) => {
			state.loading = true;
			state.error = null;
		},
		setAccount: (state, action: PayloadAction<User>) => {
			state.loading = false;
			state.account = action.payload;
			state.error = null;
		},
		setAuthError: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.account = null;
			state.refreshToken = null;
			state.token = null;
			state.error = action.payload;
		},
		setMapStyle: (state, action: PayloadAction<MapStyle>) => {
			state.loading = false;
			state.error = null;
			state.settings.mapStyle = action.payload;
		},
		resetUserSettings: (state) => {
			Object.assign(state.settings, initialState.settings);
		},
		clearAuthState: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const selectAccount = (state: RootState) => state.auth.account;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUserSettings = (state: RootState) => state.auth.settings;

export const {
	setAccount,
	setAuthTokens,
	setAuthError,
	setMapStyle,
	resetUserSettings,
	clearAuthState,
} = authSlice.actions;

export default authSlice.reducer;
