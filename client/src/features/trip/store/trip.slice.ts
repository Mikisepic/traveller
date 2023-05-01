import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import {
	Trip,
	TripPayload,
	TripState,
	TripUpdatePayload,
} from '@traveller-ui/features/trip/types';
import api from '@traveller-ui/services/api';
import { RootState } from '@traveller-ui/store';
import { PaginatedList } from '@traveller-ui/types';

import {
	SOURCE,
	createTripAction,
	deleteTripAction,
	fetchTripAction,
	fetchTripsAction,
	updateTripAction,
} from './trip.actions';

const initialState: TripState = {
	trips: {
		count: 0,
		previous: null,
		next: null,
		results: [],
	},
	trip: null,
	loading: false,
	error: null,
};

const LOCAL_STORAGE_KEY = 'trips';

export const tripSlice = createSlice({
	name: SOURCE,
	initialState,
	reducers: {
		cleanTrips: (state) => {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchTrips.fulfilled,
				(state, action: PayloadAction<PaginatedList<Trip>>) => {
					state.trips = action.payload;
					state.loading = false;
					state.error = null;
				},
			)
			.addCase(fetchTrip.fulfilled, (state, action: PayloadAction<Trip>) => {
				state.trip = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(createTrip.fulfilled, (state, action: PayloadAction<Trip>) => {
				state.trips?.results.push(action.payload);
				state.trip = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(updateTrip.fulfilled, (state, action: PayloadAction<Trip>) => {
				state.trips.results = state.trips.results.map((p) => {
					if (p.id === action.payload.id) {
						p = action.payload;
					}

					return p;
				});
				state.trip = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(deleteTrip.fulfilled, (state, action: PayloadAction<string>) => {
				state.trips.results = state.trips.results.filter(
					(p) => p.id !== action.payload,
				);
				state.trip = null;
				state.loading = false;
				state.error = null;
			})
			.addMatcher(
				(action) =>
					action.type.includes(SOURCE) &&
					(action.type.endsWith('/pending') ||
						action.type.endsWith('/rejected')),
				(state, action) => {
					state.loading = action.meta.requestStatus === 'pending';
					state.error =
						action.meta.requestStatus === 'rejected' ? action.payload : null;
				},
			);
	},
});

export const fetchTrips = createAsyncThunk<PaginatedList<Trip>, number>(
	fetchTripsAction.type,
	async (page, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<PaginatedList<Trip>> = await api.get(
				`/api/trips/?page=${page}`,
			);
			const data = response.data;

			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

			return data;
		} catch (error) {
			const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
			const value = JSON.parse(saved as string) || initialState.trips;

			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));

			return (error as AxiosError).code === 'ERR_NETWORK'
				? value
				: rejectWithValue((error as AxiosError).message);
		}
	},
);

export const fetchTrip = createAsyncThunk<Trip, string>(
	fetchTripAction.type,
	async (id, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Trip> = await api.get(`/api/trips/${id}`);
			return response.data;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const createTrip = createAsyncThunk<Trip, TripPayload>(
	createTripAction.type,
	async (payload, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Trip> = await api.post(
				`/api/trips/`,
				payload,
			);
			return response.data;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const updateTrip = createAsyncThunk<Trip, TripUpdatePayload>(
	updateTripAction.type,
	async ({ id, payload }, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Trip> = await api.patch(
				`/api/trips/${id}`,
				payload,
			);
			return response.data;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const deleteTrip = createAsyncThunk<string, string>(
	deleteTripAction.type,
	async (id, { rejectWithValue }) => {
		try {
			await api.delete(`/api/trips/${id}`);
			return id;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const selectTrips = (state: RootState) => state.trip.trips;
export const selectTrip = (state: RootState) => state.trip.trip;
export const selectTripLoading = (state: RootState) => state.trip.loading;
export const selectTripError = (state: RootState) => state.trip.error;
export const { cleanTrips } = tripSlice.actions;

export default tripSlice.reducer;
