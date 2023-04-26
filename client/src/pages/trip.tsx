import React from 'react';
import { Link } from 'react-router-dom';

import { PlusIcon } from '@heroicons/react/24/outline';

import { TripList } from '@traveller-ui/features/trip/components';
import { Header } from '@traveller-ui/layouts/header';

export const Trip: React.FC = () => {
	return (
		<>
			<div className="flex items-center justify-between">
				<Header
					title="Trips"
					description="Plan and review your upcoming trips"
				/>
				<Link
					to="new"
					className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
				>
					<PlusIcon className="h-6 w-6 text-white" />
				</Link>
			</div>

			<TripList />
		</>
	);
};
