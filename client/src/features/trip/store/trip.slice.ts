import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Trip, TripState } from '@traveller-ui/features/trip/types';
import { RootState } from '@traveller-ui/store';
import { PaginatedList } from '@traveller-ui/types';

const SOURCE = 'TRIP API';

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

export const tripSlice = createSlice({
	name: SOURCE,
	initialState,
	reducers: {
		setTrips: (state, action: PayloadAction<PaginatedList<Trip>>) => {
			state.trips = action.payload;
			state.loading = false;
			state.error = null;
		},
		setTripsLoading: (state) => {
			state.loading = true;
			state.error = null;
		},
		setTrip: (state, action: PayloadAction<Trip | null>) => {
			state.trip = action.payload;
			state.loading = false;
			state.error = null;
		},
		setTripError: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearTripState: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const selectTrips = (state: RootState) => state.trip.trips;
export const selectTrip = (state: RootState) => state.trip.trip;
export const selectTripLoading = (state: RootState) => state.trip.loading;
export const selectTripError = (state: RootState) => state.trip.error;

export const {
	setTrips,
	setTripsLoading,
	setTrip,
	setTripError,
	clearTripState,
} = tripSlice.actions;

export default tripSlice.reducer;
