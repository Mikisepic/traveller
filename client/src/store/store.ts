import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { authReducer } from '@traveller-ui/features/auth/store';
import { bookmarkReducer } from '@traveller-ui/features/bookmark/store';
import { placeReducer } from '@traveller-ui/features/map/store';
import { notificationReducer } from '@traveller-ui/features/notification/store';
import { tripReducer } from '@traveller-ui/features/trip/store';

const rootReducer = combineReducers({
	auth: authReducer,
	bookmark: bookmarkReducer,
	place: placeReducer,
	notification: notificationReducer,
	trip: tripReducer,
});

const persistCongig = {
	key: 'root',
	storage,
	version: 1,
};

const persistedReducer = persistReducer(persistCongig, rootReducer);

const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
	getDefaultMiddleware({
		serializableCheck: false,
	});

export const store = configureStore({
	reducer: persistedReducer,
	middleware,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
