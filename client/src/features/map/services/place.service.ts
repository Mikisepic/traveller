import { AxiosError } from 'axios';

import {
	apiDelete,
	apiGet,
	apiPatch,
	apiPost,
} from '@traveller-ui/services/api';
import { store } from '@traveller-ui/store';

import { setPlace, setPlaceError, setPlaces } from '../store';
import { Place, PlacePayload } from '../types';

export const fetchPlaces = async () => {
	try {
		const response = await apiGet<Place[]>(`/api/places?paginate=false`);
		store.dispatch(setPlaces(response || []));
	} catch (error) {
		store.dispatch(setPlaceError((error as AxiosError).message));
	}
};

export const fetchPlace = async (id: string) => {
	try {
		const response = await apiGet<Place>(`/api/places/${id}/`);
		store.dispatch(setPlace(response || null));
	} catch (error) {
		store.dispatch(setPlaceError((error as AxiosError).message));
	}
};

export const createPlace = async (payload: PlacePayload) => {
	try {
		const response = await apiPost<Place>(`/api/places/`, payload);
		store.dispatch(setPlace(response || null));
	} catch (error) {
		store.dispatch(setPlaceError((error as AxiosError).message));
	}
};

export const updatePlace = async (id: string, payload: PlacePayload) => {
	try {
		const response = await apiPatch<Place>(`/api/places/${id}/`, payload);
		store.dispatch(setPlace(response || null));
	} catch (error) {
		store.dispatch(setPlaceError((error as AxiosError).message));
	}
};

export const deletePlace = async (id: string) => {
	try {
		const response = await apiDelete<Place>(`/api/places/${id}/`);
		store.dispatch(setPlace(response || null));
	} catch (error) {
		store.dispatch(setPlaceError((error as AxiosError).message));
	}
};
