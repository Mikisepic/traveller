import { createAction } from '@reduxjs/toolkit';

export const SOURCE = 'BOOKMARK API';

export const fetchBookmarkAction = createAction<{ page: number }>(
	`${SOURCE} Fetch All`,
);
