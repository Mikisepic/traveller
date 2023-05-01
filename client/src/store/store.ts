import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { bookmarkReducer } from '@traveller-ui/features/bookmark/store';
import { placeReducer } from '@traveller-ui/features/map/store';
import { notificationReducer } from '@traveller-ui/features/notification/store';
import { tripReducer } from '@traveller-ui/features/trip/store';

export const store = configureStore({
	reducer: {
		bookmark: bookmarkReducer,
		place: placeReducer,
		notification: notificationReducer,
		trip: tripReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
