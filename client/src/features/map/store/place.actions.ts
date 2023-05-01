import { createAction } from '@reduxjs/toolkit';

import { PlacePayload } from '@traveller-ui/features/map/types';

export const SOURCE = 'PLACE API';

export const fetchPlacesAction = createAction(`${SOURCE} Fetch All`);
export const fetchPlaceAction = createAction<{ id: string }>(
	`${SOURCE} Fetch One`,
);
export const createPlaceAction = createAction<{ payload: PlacePayload }>(
	`${SOURCE} Create One`,
);
export const updatePlaceAction = createAction<{
	id: string;
	payload: PlacePayload;
}>(`${SOURCE} Update One`);
export const deletePlaceAction = createAction<{
	id: string;
}>(`${SOURCE} Delete One`);
