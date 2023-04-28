import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import {
	Place,
	PlacePayload,
	PlaceState,
	PlaceUpdatePayload,
} from '@traveller-ui/features/map/types';
import api from '@traveller-ui/services/api';
import { RootState } from '@traveller-ui/store';

import {
	createPlaceAction,
	deletePlaceAction,
	fetchPlaceAction,
	fetchPlacesAction,
	updatePlaceAction,
} from './place.actions';

const initialState: PlaceState = {
	places: [],
	place: null,
	loading: false,
	error: null,
};

const LOCAL_STORAGE_KEY = 'places';

export const placeSlice = createSlice({
	name: 'PLACE API',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchPlaces.fulfilled,
				(state, action: PayloadAction<Place[]>) => {
					state.places = action.payload;
					state.loading = false;
					state.error = null;
				},
			)
			.addCase(fetchPlace.fulfilled, (state, action: PayloadAction<Place>) => {
				state.place = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(createPlace.fulfilled, (state, action: PayloadAction<Place>) => {
				state.places.push(action.payload);
				state.place = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(updatePlace.fulfilled, (state, action: PayloadAction<Place>) => {
				state.places = state.places.map((p) => {
					if (p.id === action.payload.id) {
						p = action.payload;
					}

					return p;
				});
				state.place = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(
				deletePlace.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.places = state.places.filter((p) => p.id !== action.payload);
					state.place = null;
					state.loading = false;
					state.error = null;
				},
			)
			.addMatcher(
				(action) =>
					action.type.endsWith('/pending') || action.type.endsWith('/rejected'),
				(state, action) => {
					state.loading = action.meta.requestStatus === 'pending';
					state.error =
						action.meta.requestStatus === 'rejected' ? action.payload : null;
				},
			);
	},
});

export const fetchPlaces = createAsyncThunk(
	fetchPlacesAction.type,
	async (_, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Place[]> = await api.get(`/api/places/`);
			const data = response.data;

			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

			return data;
		} catch (error) {
			const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
			const value = JSON.parse(saved as string) || initialState.places;

			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));

			return (error as AxiosError).code === 'ERR_NETWORK'
				? value
				: rejectWithValue((error as AxiosError).message);
		}
	},
);

export const fetchPlace = createAsyncThunk<Place, string>(
	fetchPlaceAction.type,
	async (id, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Place> = await api.get(`/api/places/${id}`);
			return response.data;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const createPlace = createAsyncThunk<Place, PlacePayload>(
	createPlaceAction.type,
	async (payload, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Place> = await api.post(
				`/api/places/`,
				payload,
			);
			return response.data;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const updatePlace = createAsyncThunk<Place, PlaceUpdatePayload>(
	updatePlaceAction.type,
	async ({ id, payload }, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Place> = await api.patch(
				`/api/places/${id}`,
				payload,
			);
			return response.data;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const deletePlace = createAsyncThunk<string, string>(
	deletePlaceAction.type,
	async (id, { rejectWithValue }) => {
		try {
			await api.delete(`/api/places/${id}`);
			return id;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const selectPlaces = (state: RootState) => state.place.places;
export const selectPlace = (state: RootState) => state.place.place;
export const selectPlaceLoading = (state: RootState) => state.place.loading;
export const selectPlaceError = (state: RootState) => state.place.error;

export default placeSlice.reducer;
