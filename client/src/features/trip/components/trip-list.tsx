import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import { Button } from '@traveller-ui/components/button';
import { LoadingSpinner } from '@traveller-ui/components/loading';
import { Pagination } from '@traveller-ui/components/pagination';
import {
	clearTripState,
	selectTripLoading,
	selectTrips,
	setTripsLoading,
} from '@traveller-ui/features/trip/store';
import { Header } from '@traveller-ui/layouts/header';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';

import { deleteTrip, fetchTrips } from '../services';

export const TripList: React.FC = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

	const dispatch = useAppDispatch();
	const trips = useAppSelector(selectTrips);
	const loading = useAppSelector(selectTripLoading);

	useEffect(() => {
		dispatch(setTripsLoading());
		fetchTrips(page);
	}, [page]);

	useEffect(() => {
		return () => {
			dispatch(clearTripState());
		};
	}, []);

	const handleDelete = async (id: string) => {
		const confirmation = confirm(`Delete this trip?`);

		if (confirmation) {
			deleteTrip(id);
		}
	};

	const handleRedirect = (pageLocation: number) => setPage(pageLocation);

	return (
		<>
			{loading && <LoadingSpinner />}
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

			<div className={loading ? 'opacity-20' : ''}>
				{!!trips && trips.results.length !== 0 ? (
					trips.results.map((trip) => (
						<div
							key={trip.id}
							className="max-w-xl mx-auto mb-5 p-6 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
						>
							<Link to={trip.id}>
								<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{trip.title}
								</h5>
								<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
									{trip.description}
								</p>
							</Link>
							<Button theme="danger" onClick={() => handleDelete(trip.id)}>
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
				instances={trips}
				handleRedirect={handleRedirect}
			/>
		</>
	);
};
