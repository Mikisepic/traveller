import { AxiosError } from 'axios';

import { Place } from '@traveller-ui/features/map/types';
import { apiGet } from '@traveller-ui/services/api';
import { store } from '@traveller-ui/store';
import { PaginatedList } from '@traveller-ui/types';

import { setBookmarkError, setBookmarks } from '../store';

export const fetchBookmarks = async (page: number) => {
	try {
		const response = await apiGet<PaginatedList<Place>>(
			`/api/places?isBookmarked=true&page=${page}`,
		);
		store.dispatch(setBookmarks(response));
	} catch (error) {
		store.dispatch(setBookmarkError((error as AxiosError).message));
	}
};
