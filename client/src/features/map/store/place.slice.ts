import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
	MapboxOptimizationTrip,
	MapboxOptimizationWaypoint,
	MapboxRoute,
	MapboxWaypoint,
	Place,
	PlaceState,
} from '@traveller-ui/features/map/types';
import { RootState } from '@traveller-ui/store';

const SOURCE = 'PLACE API';

const initialState: PlaceState = {
	places: [],
	place: null,
	waypoints: null,
	optimizations: null,
	routes: null,
	loading: false,
	error: null,
};

export const placeSlice = createSlice({
	name: SOURCE,
	initialState,
	reducers: {
		setPlaces: (state, action: PayloadAction<Place[]>) => {
			state.places = action.payload;
			state.loading = false;
			state.error = null;
		},
		setPlacesLoading: (state) => {
			state.loading = true;
			state.error = null;
		},
		setOptimizations: (
			state,
			action: PayloadAction<MapboxOptimizationTrip[]>,
		) => {
			state.optimizations = action.payload;
			state.loading = false;
			state.error = null;
		},
		setWaypoints: (
			state,
			action: PayloadAction<MapboxOptimizationWaypoint[] | MapboxWaypoint[]>,
		) => {
			state.waypoints = action.payload;
			state.loading = false;
			state.error = null;
		},
		setRoutes: (state, action: PayloadAction<MapboxRoute[]>) => {
			state.routes = action.payload;
			state.loading = false;
			state.error = null;
		},
		setPlace: (state, action: PayloadAction<Place | null>) => {
			state.place = action.payload;
			state.loading = false;
			state.error = null;
		},
		setPlaceError: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearPlaceState: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const selectPlaces = (state: RootState) => state.place.places;
export const selectPlace = (state: RootState) => state.place.place;
export const selectOptimizations = (state: RootState) =>
	state.place.optimizations;
export const selectWaypoints = (state: RootState) => state.place.waypoints;
export const selectRoutes = (state: RootState) => state.place.routes;
export const selectPlaceLoading = (state: RootState) => state.place.loading;
export const selectPlaceError = (state: RootState) => state.place.error;

export const {
	setPlaces,
	setPlacesLoading,
	setPlace,
	setOptimizations,
	setWaypoints,
	setRoutes,
	setPlaceError,
	clearPlaceState,
} = placeSlice.actions;

export default placeSlice.reducer;
