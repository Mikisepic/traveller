import { createAction } from '@reduxjs/toolkit';

import { TripPayload } from '@traveller-ui/views';

const SOURCE = 'TRIP API';

export const fetchTripsAction = createAction<{ page: number }>(
	`${SOURCE} Fetch All`,
);
export const fetchTripAction = createAction<{ id: string }>(
	`${SOURCE} Fetch One`,
);
export const createTripAction = createAction<{ payload: TripPayload }>(
	`${SOURCE} Create One`,
);
export const updateTripAction = createAction<{
	id: string;
	payload: TripPayload;
}>(`${SOURCE} Update One`);
export const deleteTripAction = createAction<{
	id: string;
}>(`${SOURCE} Delete One`);
