import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { TrashIcon } from '@heroicons/react/24/outline';

import { Button } from '@traveller-ui/components/button';
import { LoadingSpinner } from '@traveller-ui/components/loading';
import { Pagination } from '@traveller-ui/components/pagination';
import {
	selectBookmarkLoading,
	selectBookmarks,
	setBookmarkLoading,
} from '@traveller-ui/features/bookmark/store';
import { updatePlace } from '@traveller-ui/features/map/services';
import { Place, PlacePayload } from '@traveller-ui/features/map/types';
import { createNotification } from '@traveller-ui/features/notification/services';
import { NotificationListenerContext } from '@traveller-ui/providers';
import { useAppSelector } from '@traveller-ui/store';
import { fetchBookmarks } from '../services';

export const BookmarkList: React.FC = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

	const { setNotificationListener } = useContext(NotificationListenerContext);
	const bookmarks = useAppSelector(selectBookmarks);
	const loading = useAppSelector(selectBookmarkLoading);

	const handleRedirect = (pageLocation: number) => setPage(pageLocation);

	const handleBookmarking = async (p: Place) => {
		const payload: PlacePayload = {
			title: p.title,
			description: p.description,
			lat: p.lat,
			lng: p.lng,
			priority: p.priority,
			isBookmarked: !p.isBookmarked,
		};

		updatePlace(p.id, payload);

		createNotification({
			title: `${p.title} Unbookmarked!`,
			body: 'You have unbookmarked a location.',
		});

		setNotificationListener(Math.random() * 100);
	};

	useEffect(() => {
		setBookmarkLoading();
		fetchBookmarks(1);
	}, []);

	return (
		<>
			<div className={loading ? 'opacity-20' : ''}>
				{loading && <LoadingSpinner />}

				{!!bookmarks && bookmarks.results.length !== 0 ? (
					bookmarks.results.map((bookmark) => (
						<div
							key={bookmark.id}
							className="max-w-xl mx-auto mb-5 p-6 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
						>
							<div>
								<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{bookmark.title}
								</h5>
								<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
									{bookmark.description}
								</p>
							</div>
							<Button
								theme="danger"
								onClick={() => handleBookmarking(bookmark)}
							>
								<TrashIcon className="h-8 w-8 text-white" />
							</Button>
						</div>
					))
				) : (
					<h1 className="mb-4 text-2xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
						No records
					</h1>
				)}
			</div>

			<Pagination
				page={page}
				instances={bookmarks}
				handleRedirect={handleRedirect}
			/>
		</>
	);
};
