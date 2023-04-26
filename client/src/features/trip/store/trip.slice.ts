import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import {
	Trip,
	TripPayload,
	TripUpdatePayload,
} from '@traveller-ui/features/trip/types';
import { RootState } from '@traveller-ui/store';
import { PaginatedList } from '@traveller-ui/types';

import {
	createTripAction,
	deleteTripAction,
	fetchTripAction,
	fetchTripsAction,
	updateTripAction,
} from './trip.actions';

interface PlaceState {
	trips: PaginatedList<Trip>;
	trip: Trip | null;
	loading: boolean;
	error: string | null;
}

const initialState: PlaceState = {
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

export const tripSlice = createSlice({
	name: 'TRIP API',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTrips.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchTrips.fulfilled,
				(state, action: PayloadAction<PaginatedList<Trip>>) => {
					state.trips = action.payload;
					state.loading = false;
					state.error = null;
				},
			)
			.addCase(fetchTrips.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchTrip.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTrip.fulfilled, (state, action: PayloadAction<Trip>) => {
				state.trip = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchTrip.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(createTrip.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createTrip.fulfilled, (state, action: PayloadAction<Trip>) => {
				state.trips?.results.push(action.payload);
				state.trip = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(createTrip.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(updateTrip.pending, (state) => {
				state.loading = true;
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
			.addCase(updateTrip.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(deleteTrip.pending, (state) => {
				state.loading = true;
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
			.addCase(deleteTrip.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const fetchTrips = createAsyncThunk<PaginatedList<Trip>, number>(
	fetchTripsAction.type,
	async (page, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<PaginatedList<Trip>> = await axios.get(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/?page=${page}`,
			);
			return response.data;
		} catch (error) {
			return rejectWithValue((error as AxiosError).message);
		}
	},
);

export const fetchTrip = createAsyncThunk<Trip, string>(
	fetchTripAction.type,
	async (id, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Trip> = await axios.get(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/${id}`,
			);
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
			const response: AxiosResponse<Trip> = await axios.post(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/`,
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
			const response: AxiosResponse<Trip> = await axios.patch(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/${id}`,
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
			await axios.delete(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/${id}`,
			);
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

export default tripSlice.reducer;
