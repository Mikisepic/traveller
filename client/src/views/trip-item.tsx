import React, { useEffect, useState } from 'react';

import { CheckCircleIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';

import { Place } from '@traveller-ui/components/map';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';
import {
	createTrip,
	fetchTrip,
	selectTrip,
	updateTrip,
} from '@traveller-ui/store/features/trip';
import { fetchPlaces, selectPlaces } from '@traveller-ui/store/features/place';

import { TripPayload } from './types';

export const TripItem = () => {
	const dispatch = useAppDispatch();
	const trip = useAppSelector(selectTrip);
	const places = useAppSelector(selectPlaces);

	const { pathname } = useLocation();

	const isNew = pathname.includes('new');

	const [locations, setLocations] = useState<Place[]>([]);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	useEffect(() => {
		dispatch(fetchPlaces());
		if (!isNew) dispatch(fetchTrip(pathname.split('/').pop() as string));
	}, []);

	useEffect(() => {
		if (trip) {
			setTitle(trip.title);
			setDescription(trip.description);
			setLocations(trip.locations);
		}
	}, [trip]);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDescription(e.target.value);

	const handleCheckboxClick = (loc: Place) => {
		const index = locations.indexOf(loc);

		if (index !== -1) {
			setLocations(locations.splice(index, 1));
		} else {
			setLocations([...locations, loc]);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (locations && title && description) {
			const payload: TripPayload = {
				title,
				description,
				locations,
			};

			isNew
				? dispatch(createTrip(payload))
				: dispatch(updateTrip({ id: trip?.id as string, payload }));
		}
	};

	const copyTextToClipboard = () => {
		navigator.clipboard.writeText(window.location.href);
	};

	return (
		<>
			<h1 className="text-4xl mb-3 font-bold dark:text-white">
				{isNew ? 'Create ' : 'View '}
				Trip
				<small className="ml-2 text-base font-semibold text-gray-500 dark:text-gray-400">
					Manage your trip
				</small>
			</h1>

			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Title
					</label>
					<input
						type="text"
						name="title"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Title"
						value={title}
						autoFocus
						required
						onChange={handleTitleChange}
					/>
					<button
						onClick={copyTextToClipboard}
						className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
					>
						<ClipboardIcon className="h-6 w-6 text-white" />
					</button>
				</div>

				<div className="mb-6">
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Description
					</label>
					<input
						type="text"
						name="description"
						value={description}
						className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						onChange={handleDescriptionChange}
					/>
				</div>

				<div className="mb-6">
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Locations
					</label>
					<ul className="max-w-md max-h-[200px] overflow-y-auto space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
						{places.length > 0
							? places.map((place, index) => (
									<li key={index}>
										<div className="flex items-center mb-4">
											<button
												type="button"
												className="flex gap-5"
												onClick={() => handleCheckboxClick(place)}
											>
												<CheckCircleIcon
													className={[
														'h-6 w-6 border rounded-full text-white',
														locations.indexOf(place) > -1
															? 'bg-green-500'
															: 'bg-red-500',
													].join(' ')}
												/>
												{place.title}
											</button>
										</div>
									</li>
							  ))
							: 'No locations'}
					</ul>
				</div>

				<div className="flex place-content-end gap-5">
					{isNew ? (
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Create
						</button>
					) : (
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Update
						</button>
					)}
				</div>
			</form>
		</>
	);
};
