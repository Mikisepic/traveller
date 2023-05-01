import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { BookmarkState } from '@traveller-ui/features/bookmark/types';
import { Place } from '@traveller-ui/features/map/types';
import api from '@traveller-ui/services/api';
import { RootState } from '@traveller-ui/store';
import { PaginatedList } from '@traveller-ui/types';

import { SOURCE, fetchBookmarkAction } from './bookmark.actions';

const initialState: BookmarkState = {
	bookmarks: {
		count: 0,
		previous: null,
		next: null,
		results: [],
	},
	loading: false,
	error: null,
};

const LOCAL_STORAGE_KEY = 'bookmarks';

export const bookmarkSlice = createSlice({
	name: SOURCE,
	initialState,
	reducers: {
		cleanBookmarks: (state) => {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchBookmarks.fulfilled,
				(state, action: PayloadAction<PaginatedList<Place>>) => {
					state.bookmarks = action.payload;
					state.loading = false;
					state.error = null;
				},
			)
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

export const fetchBookmarks = createAsyncThunk<PaginatedList<Place>, number>(
	fetchBookmarkAction.type,
	async (page, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<PaginatedList<Place>> = await api.get(
				`/api/places?isBookmarked=true&page=${page}`,
			);
			const data = response.data;

			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

			return data;
		} catch (error) {
			const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
			const value = JSON.parse(saved as string) || initialState.bookmarks;

			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));

			return (error as AxiosError).code === 'ERR_NETWORK'
				? value
				: rejectWithValue((error as AxiosError).message);
		}
	},
);

export const selectBookmarks = (state: RootState) => state.bookmark.bookmarks;
export const selectBookmarkLoading = (state: RootState) =>
	state.bookmark.loading;
export const selectBookmarkError = (state: RootState) => state.bookmark.error;
export const { cleanBookmarks } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
