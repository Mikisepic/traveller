import axios, { AxiosError, AxiosResponse } from 'axios';

import {
	apiDelete,
	apiGet,
	apiPatch,
	apiPost,
} from '@traveller-ui/services/api';
import { store } from '@traveller-ui/store';

import {
	setOptimizations,
	setPlace,
	setPlaceError,
	setPlaces,
	setRoutes,
	setWaypoints,
} from '../store';
import {
	Coordinates,
	MapboxDirectionsResponse,
	MapboxOptimizationResponse,
	Place,
	PlacePayload,
} from '../types';

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

export const fetchGeometries = async (coordinates: Coordinates[]) => {
	try {
		const requestedLocations = coordinates
			.map(({ lat, lng }) => [lng, lat].join(','))
			.join(';');

		const response: AxiosResponse<MapboxDirectionsResponse> = await axios.get(
			`https://api.mapbox.com/directions/v5/mapbox/driving/${requestedLocations}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${
				(import.meta as any).env.VITE_MAPBOX_ACCESS_TOKEN
			}`,
		);
		const data = response.data;

		store.dispatch(setRoutes(data.routes));
		store.dispatch(setWaypoints(data.waypoints));
	} catch (error) {
		store.dispatch(setPlaceError((error as AxiosError).message));
	}
};

export const fetchOptimization = async (
	profile: string,
	coordinates: Coordinates[],
) => {
	try {
		const requestedLocations = coordinates
			.map(({ lat, lng }) => [lng, lat].join(','))
			.join(';');

		const response: AxiosResponse<MapboxOptimizationResponse> = await axios.get(
			`https://api.mapbox.com/optimized-trips/v1/mapbox/${profile}/${requestedLocations}?geometries=geojson&language=en&overview=full&steps=true&access_token=${
				(import.meta as any).env.VITE_MAPBOX_ACCESS_TOKEN
			}`,
		);
		const data = response.data;

		store.dispatch(setOptimizations(data.trips));
		store.dispatch(setWaypoints(data.waypoints));
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
