import axios, { AxiosError, AxiosResponse } from 'axios';

import {
	apiDelete,
	apiGet,
	apiPatch,
	apiPost,
} from '@traveller-ui/services/api';
import { store } from '@traveller-ui/store';

import { setGeometries, setPlace, setPlaceError, setPlaces } from '../store';
import { Coordinates, DirectionsData, Place, PlacePayload } from '../types';

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

export const fetchGeometries = async (start: Coordinates, end: Coordinates) => {
	try {
		const response: AxiosResponse<DirectionsData> = await axios.get(
			`https://api.mapbox.com/directions/v5/mapbox/driving/${start.lat},${
				start.lng
			};${end.lat},${
				end.lng
			}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${
				(import.meta as any).env.VITE_MAPBOX_ACCESS_TOKEN
			}`,
		);
		const data = response.data;

		// Choose the first option
		const geometries = data.routes[0].legs[0].steps.map(
			(step) => step.geometry,
		);

		store.dispatch(setGeometries(geometries));
	} catch (error) {
		store.dispatch(setPlaceError((error as AxiosError).message));
	}
};

// TODO: Optimization API
export const fetchOptimization = async (
	profile: string,
	coordinates: Coordinates[],
) => {
	try {
		const response: AxiosResponse<DirectionsData> = await axios.get(
			`https://api.mapbox.com/optimized-trips/v1/${profile}/${coordinates}?access_token=${
				(import.meta as any).env.VITE_MAPBOX_ACCESS_TOKEN
			}`,
		);
		const data = response.data;
		console.log(data);
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
