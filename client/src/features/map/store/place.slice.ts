import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Place, PlaceState } from '@traveller-ui/features/map/types';
import { RootState } from '@traveller-ui/store';

const SOURCE = 'PLACE API';

const initialState: PlaceState = {
	places: [],
	place: null,
	geometries: null,
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
		setGeometries: (state, action: PayloadAction<GeoJSON.Geometry[]>) => {
			state.geometries = action.payload;
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
export const selectGeometries = (state: RootState) => state.place.geometries;
export const selectPlaceLoading = (state: RootState) => state.place.loading;
export const selectPlaceError = (state: RootState) => state.place.error;

export const {
	setPlaces,
	setPlacesLoading,
	setPlace,
	setGeometries,
	setPlaceError,
	clearPlaceState,
} = placeSlice.actions;

export default placeSlice.reducer;
