import { AxiosError } from 'axios';

import {
	apiDelete,
	apiGet,
	apiPatch,
	apiPost,
} from '@traveller-ui/services/api';
import { store } from '@traveller-ui/store';
import { PaginatedList } from '@traveller-ui/types';

import { setTrip, setTripError, setTrips } from '../store';
import { Trip, TripPayload } from '../types';

export const fetchTrips = async (page: number) => {
	try {
		const response = await apiGet<PaginatedList<Trip>>(
			`/api/trips?page=${page}`,
		);
		store.dispatch(setTrips(response || []));
	} catch (error) {
		store.dispatch(setTripError((error as AxiosError).message));
	}
};

export const fetchTrip = async (id: string) => {
	try {
		const response = await apiGet<Trip>(`/api/trips/${id}/`);
		store.dispatch(setTrip(response || null));
	} catch (error) {
		store.dispatch(setTripError((error as AxiosError).message));
	}
};

export const createTrip = async (payload: TripPayload) => {
	try {
		const response = await apiPost<Trip>(`/api/trips/`, payload);
		store.dispatch(setTrip(response || null));
	} catch (error) {
		store.dispatch(setTripError((error as AxiosError).message));
	}
};

export const updateTrip = async (id: string, payload: TripPayload) => {
	try {
		const response = await apiPatch<Trip>(`/api/trips/${id}/`, payload);
		store.dispatch(setTrip(response || null));
	} catch (error) {
		store.dispatch(setTripError((error as AxiosError).message));
	}
};

export const deleteTrip = async (id: string) => {
	try {
		const response = await apiDelete<Trip>(`/api/trips/${id}/`);
		store.dispatch(setTrip(response || null));
	} catch (error) {
		store.dispatch(setTripError((error as AxiosError).message));
	}
};
