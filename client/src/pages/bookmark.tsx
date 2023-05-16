import React, { useEffect } from 'react';

import { Header } from '@traveller-ui/layouts/header';

import { BookmarkList } from '@traveller-ui/features/bookmark/components';
import { fetchBookmarks } from '@traveller-ui/features/bookmark/services';
import {
	clearBookmarkState,
	setBookmarkLoading,
} from '@traveller-ui/features/bookmark/store';
import { useAppDispatch } from '@traveller-ui/store';
import { useLocation } from 'react-router-dom';

export const Bookmark: React.FC = () => {
	const dispatch = useAppDispatch();

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const page = parseInt(searchParams.get('page') || '1');

	useEffect(() => {
		dispatch(setBookmarkLoading());
		fetchBookmarks(page);
	}, [page]);

	useEffect(() => {
		return () => {
			clearBookmarkState();
		};
	}, []);

	return (
		<>
			<Header title="Bookmarks" description="Preview your saved destinations" />
			<BookmarkList />
		</>
	);
};
