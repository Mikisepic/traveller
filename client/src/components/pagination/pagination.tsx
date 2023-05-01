import React from 'react';

import { Place } from '@traveller-ui/features/map/types';
import { Trip } from '@traveller-ui/features/trip/types';
import { PaginatedList } from '@traveller-ui/types';
import { Notification } from '@traveller-ui/features/notification/types';
import { Link } from 'react-router-dom';

interface Props {
	page: number;
	instances: PaginatedList<Trip | Place | Notification>;
	handleRedirect: (pageLocation: number) => void;
}

export const Pagination: React.FC<Props> = ({
	page,
	instances: { count },
	handleRedirect,
}) => {
	return (
		<div className="flex flex-col items-center">
			<span className="text-sm text-gray-700 dark:text-gray-400">
				Showing{' '}
				<span className="font-semibold text-gray-900 dark:text-white">
					{5 * (page - 1)}
				</span>{' '}
				to{' '}
				<span className="font-semibold text-gray-900 dark:text-white">
					{5 * page > count ? count : 5 * page}
				</span>{' '}
				of{' '}
				<span className="font-semibold text-gray-900 dark:text-white">
					{count}
				</span>{' '}
				Entries
			</span>

			<div className="inline-flex mt-2 xs:mt-0">
				<Link
					to={`/trips?page=${page - 1 === 0 ? page : page - 1}`}
					onClick={() => handleRedirect(page - 1 === 0 ? page : page - 1)}
					className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					Previous
				</Link>
				<Link
					to={`/trips?page=${5 * page < count ? page + 1 : page}`}
					onClick={() => handleRedirect(5 * page < count ? page + 1 : page)}
					className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					Next
				</Link>
			</div>
		</div>
	);
};
