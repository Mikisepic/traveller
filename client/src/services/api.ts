import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import {
	clearAuthState,
	setAuthTokens,
} from '@traveller-ui/features/auth/store';
import { clearBookmarkState } from '@traveller-ui/features/bookmark/store';
import { clearPlaceState } from '@traveller-ui/features/map/store';
import { clearTripState } from '@traveller-ui/features/trip/store';
import { store } from '@traveller-ui/store';

const axiosService = axios.create({
	baseURL: `${(import.meta as any).env.VITE_BACKEND_API}`,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosService.interceptors.request.use(async (config) => {
	const { token } = store.getState().auth;

	if (token !== null) {
		config.headers.Authorization = 'Bearer ' + token;
		// console.debug('[Request]', config, JSON.stringify(token));
	}
	return config;
});

axiosService.interceptors.response.use(
	(res) => {
		// console.debug('[Response]', res.config, res.status, res.data);
		return Promise.resolve(res);
	},
	(err) => {
		// console.debug(
		// 	'[Response]',
		// 	err.config.baseURL + err.config.url,
		// 	err.response.status,
		// 	err.response.data,
		// );
		return Promise.reject(err);
	},
);

// @ts-ignore
const refreshAuthLogic = async (failedRequest) => {
	const { refreshToken } = store.getState().auth;

	if (refreshToken !== null) {
		return axios
			.post(
				'/api/users/auth/refresh/',
				{
					refresh: refreshToken,
				},
				{
					baseURL: `${(import.meta as any).env.VITE_BACKEND_API}`,
				},
			)
			.then((resp) => {
				const { access, refresh } = resp.data;
				failedRequest.response.config.headers.Authorization =
					'Bearer ' + access;
				store.dispatch(
					setAuthTokens({
						token: access,
						refreshToken: refresh,
					}),
				);
			})
			.catch((err) => {
				if (err.response && err.response.status === 401) {
					store.dispatch(clearAuthState());
					store.dispatch(clearPlaceState());
					store.dispatch(clearBookmarkState());
					store.dispatch(clearTripState());
				}
			});
	}
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export const apiGet = async <T = any>(url: string): Promise<T> => {
	const response = await axiosService.get<T>(url);
	return response.data;
};

export const apiPost = async <T = any>(
	url: string,
	payload: any,
): Promise<T> => {
	const response = await axiosService.post<T>(url, payload);
	return response.data;
};

export const apiPatch = async <T = any>(
	url: string,
	payload: any,
): Promise<T> => {
	const response = await axiosService.patch<T>(url, payload);
	return response.data;
};

export const apiDelete = async <T = any>(url: string): Promise<T> => {
	const response = await axiosService.delete<T>(url);
	return response.data;
};

export default axiosService;
