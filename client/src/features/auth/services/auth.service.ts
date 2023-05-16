import axios, { AxiosError, AxiosResponse } from 'axios';

import { store } from '@traveller-ui/store';

import {
	clearAuthState,
	setAccount,
	setAuthError,
	setAuthTokens,
} from '../store';
import { AccountResponse, LoginPayload, RegisterPayload } from '../types';

export const performLogin = async (credentials: LoginPayload) => {
	try {
		const response: AxiosResponse<AccountResponse> = await axios.post(
			`${(import.meta as any).env.VITE_BACKEND_API}/api/users/auth/login/`,
			credentials,
		);
		store.dispatch(setAccount(response.data.user));
		store.dispatch(
			setAuthTokens({
				token: response.data.access,
				refreshToken: response.data.refresh,
			}),
		);
	} catch (error) {
		store.dispatch(setAuthError((error as AxiosError).message));
	}
};

export const performRegister = async (credentials: RegisterPayload) => {
	try {
		const response: AxiosResponse<AccountResponse> = await axios.post(
			`${(import.meta as any).env.VITE_BACKEND_API}/api/users/auth/register/`,
			credentials,
		);
		store.dispatch(clearAuthState());
	} catch (error) {
		store.dispatch(setAuthError((error as AxiosError).message));
	}
};
