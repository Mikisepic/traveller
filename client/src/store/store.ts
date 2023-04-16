import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import placeReducer from './features/place/place.slice';
import tripReducer from './features/trip/trip.slice';

export const store = configureStore({
	reducer: {
		place: placeReducer,
		trip: tripReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
