import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BookmarkState } from '@traveller-ui/features/bookmark/types';
import { Place } from '@traveller-ui/features/map/types';
import { RootState } from '@traveller-ui/store';
import { PaginatedList } from '@traveller-ui/types';

const SOURCE = 'BOOKMARK API';

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

export const bookmarkSlice = createSlice({
	name: SOURCE,
	initialState,
	reducers: {
		setBookmarks: (state, action: PayloadAction<PaginatedList<Place>>) => {
			state.bookmarks = action.payload;
			state.loading = false;
			state.error = null;
		},
		setBookmarkLoading: (state) => {
			state.loading = true;
			state.error = null;
		},
		setBookmarkError: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearBookmarkState: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const selectBookmarks = (state: RootState) => state.bookmark.bookmarks;
export const selectBookmarkLoading = (state: RootState) =>
	state.bookmark.loading;
export const selectBookmarkError = (state: RootState) => state.bookmark.error;

export const {
	setBookmarks,
	setBookmarkLoading,
	setBookmarkError,
	clearBookmarkState,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
