import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import axios from 'axios';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import { PaginatedList } from '../types';
import { Trip } from './types';

export const TripList: React.FC = () => {
	const [trips, setTrips] = useState<PaginatedList<Trip>>();

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

	const getTrips = async () => {
		try {
			const allTrips = await axios.get(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/?page=${page}`,
			);
			setTrips(allTrips.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getTrips();
	}, [page]);

	const handleDelete = async (id: string) => {
		try {
			await axios.delete(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/${id}`,
			);
		} catch (err) {
			console.error(err);
		}

		getTrips();
	};

	const handleRedirect = (pageLocation: number) => setPage(pageLocation);

	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="text-4xl mb-3 font-bold dark:text-white">
					Trips
					<small className="ml-2 text-base font-semibold text-gray-500 dark:text-gray-400">
						Plan and review your upcoming trips
					</small>
				</h1>
				<Link
					to="new"
					className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
				>
					<PlusIcon className="h-6 w-6 text-white" />
				</Link>
			</div>

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
						<button
							type="button"
							className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700"
							onClick={() => handleDelete(trip.id)}
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

			{!!trips && trips.results.length !== 0 ? (
				<div className="flex flex-col items-center">
					<span className="text-sm text-gray-700 dark:text-gray-400">
						Showing{' '}
						<span className="font-semibold text-gray-900 dark:text-white">
							{5 * (page - 1)}
						</span>{' '}
						to{' '}
						<span className="font-semibold text-gray-900 dark:text-white">
							{5 * page > trips.count ? trips.count : 5 * page}
						</span>{' '}
						of{' '}
						<span className="font-semibold text-gray-900 dark:text-white">
							{trips.count}
						</span>{' '}
						Entries
					</span>

					<div className="inline-flex mt-2 xs:mt-0">
						<Link
							to={`/trips?page=${page - 1 === 0 ? page : page - 1}`}
							onClick={() => handleRedirect(page - 1 === 0 ? page : page - 1)}
							className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							Prev
						</Link>
						<Link
							to={`/trips?page=${5 * page < trips.count ? page + 1 : page}`}
							onClick={() =>
								handleRedirect(5 * page < trips.count ? page + 1 : page)
							}
							className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							Next
						</Link>
					</div>
				</div>
			) : null}
		</>
	);
};
