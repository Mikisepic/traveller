import React, { useEffect, useState } from 'react';

import { TrashIcon } from '@heroicons/react/24/outline';

import { Place, PlacePayload } from '@traveller-ui/components/map';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';
import {
	fetchPlaces,
	selectPlaces,
	updatePlace,
} from '@traveller-ui/store/features/place';

export const Bookmark: React.FC = () => {
	const dispatch = useAppDispatch();
	const places = useAppSelector(selectPlaces);

	const paginate = (page = 1, perPage = 5) => {
		const offset = perPage * (page - 1);
		const totalItems = places.filter(({ isBookmarked }) => isBookmarked);
		const paginatedItems = totalItems.slice(offset, perPage * page);
		const totalPages = Math.ceil(totalItems.length / perPage);

		return {
			perPage,
			count: totalItems.length,
			page,
			totalPages: totalPages,
			previousPage: page - 1 ? page - 1 : 1,
			nextPage: page < totalPages ? page + 1 : page,
			items: paginatedItems,
		};
	};

	const [pagination, setPagination] = useState(paginate());

	useEffect(() => {
		dispatch(fetchPlaces());
	}, []);

	useEffect(() => {
		setPagination(paginate());
	}, [places]);

	const handlePageChange = (nextPage: number) =>
		setPagination(paginate(nextPage));

	const handleBookmarking = async (p: Place) => {
		const payload: PlacePayload = {
			title: p.title,
			description: p.description,
			lat: p.lat,
			lng: p.lng,
			priority: p.priority,
			isBookmarked: !p.isBookmarked,
		};

		dispatch(updatePlace({ id: p.id, payload }));
	};

	return (
		<>
			<h1 className="text-4xl mb-5 font-bold dark:text-white">
				Bookmarks
				<small className="ml-2 text-base font-semibold text-gray-500 dark:text-gray-400">
					Preview your saved destinations
				</small>
			</h1>

			{pagination.items.length !== 0 ? (
				pagination.items.map((pin) => (
					<div
						key={pin.id}
						className="max-w-xl mx-auto mb-5 p-6 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
					>
						<div>
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{pin.title}
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{pin.description}
							</p>
						</div>
						<button
							type="button"
							className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700"
							onClick={() => handleBookmarking(pin)}
						>
							<TrashIcon className="h-8 w-8 text-white" />
						</button>
					</div>
				))
			) : (
				<h1 className="mb-4 text-2xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
					No records
				</h1>
			)}

			<div className="flex flex-col items-center">
				<span className="text-sm text-gray-700 dark:text-gray-400">
					Showing{' '}
					<span className="font-semibold text-gray-900 dark:text-white">
						{pagination.perPage * (pagination.previousPage - 1)}
					</span>{' '}
					to{' '}
					<span className="font-semibold text-gray-900 dark:text-white">
						{pagination.perPage * pagination.page > pagination.count
							? pagination.count
							: pagination.perPage * pagination.page}
					</span>{' '}
					of{' '}
					<span className="font-semibold text-gray-900 dark:text-white">
						{pagination.count}
					</span>{' '}
					Entries
				</span>

				<div className="inline-flex mt-2 xs:mt-0">
					<button
						onClick={() => handlePageChange(pagination.previousPage)}
						className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>
						Prev
					</button>
					<button
						onClick={() => handlePageChange(pagination.nextPage)}
						className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>
						Next
					</button>
				</div>
			</div>
		</>
	);
};
