import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { Place, PlacePayload } from '@traveller-ui/components/map';

import { RootState } from '../../store';
import {
	createPlaceAction,
	deletePlaceAction,
	fetchPlaceAction,
	fetchPlacesAction,
	updatePlaceAction,
} from './place.actions';
import { PlaceUpdatePayload } from './types';

interface PlaceState {
	places: Place[];
	place: Place | null;
	loading: boolean;
	error: string | null;
}

const initialState: PlaceState = {
	places: [],
	place: null,
	loading: false,
	error: null,
};

export const placeSlice = createSlice({
	name: 'PLACE API',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPlaces.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchPlaces.fulfilled,
				(state, action: PayloadAction<Place[]>) => {
					state.places = action.payload;
					state.loading = false;
					state.error = null;
				},
			)
			.addCase(fetchPlaces.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchPlace.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPlace.fulfilled, (state, action: PayloadAction<Place>) => {
				state.place = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchPlace.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(createPlace.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createPlace.fulfilled, (state, action: PayloadAction<Place>) => {
				state.places.push(action.payload);
				state.place = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(createPlace.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(updatePlace.pending, (state) => {
				state.loading = true;
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
			.addCase(updatePlace.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(deletePlace.pending, (state) => {
				state.loading = true;
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
			.addCase(deletePlace.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const fetchPlaces = createAsyncThunk(
	fetchPlacesAction.type,
	async (_, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Place[]> = await axios.get(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/places/`,
			);
			return response.data;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const fetchPlace = createAsyncThunk<Place, string>(
	fetchPlaceAction.type,
	async (id, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Place> = await axios.get(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/places/${id}`,
			);
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
			const response: AxiosResponse<Place> = await axios.post(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/places/`,
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
			const response: AxiosResponse<Place> = await axios.patch(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/places/${id}`,
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
			await axios.delete(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/places/${id}`,
			);
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
