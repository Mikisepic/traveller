import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CheckCircleIcon, ClipboardIcon } from '@heroicons/react/24/outline';

import { Button } from '@traveller-ui/components/button';
import { fetchPlaces, selectPlaces } from '@traveller-ui/features/map/store';
import { Place } from '@traveller-ui/features/map/types';
import { createNotification } from '@traveller-ui/features/notification/store';
import {
	createTrip,
	fetchTrip,
	selectTrip,
	updateTrip,
} from '@traveller-ui/features/trip/store';
import { TripPayload } from '@traveller-ui/features/trip/types';
import { NotificationListenerContext } from '@traveller-ui/providers';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';

export const TripItem = () => {
	const { setNotificationListener } = useContext(NotificationListenerContext);

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

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
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

			dispatch(
				createNotification({
					title: isNew ? 'New Trip Created!' : `Trip ${title} Updated!`,
					body: isNew
						? 'You have created a new trip.'
						: 'You have updated a trip instance',
				}),
			);
			setNotificationListener(Math.random() * 100);
		}
	};

	const copyTextToClipboard = () => {
		navigator.clipboard.writeText(window.location.href);
	};

	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="text-4xl mb-3 font-bold dark:text-white">
					{isNew ? 'Create ' : 'View '}
					Trip
					<small className="ml-2 text-base font-semibold text-gray-500 dark:text-gray-400">
						Manage your trip
					</small>
				</h1>
				<Button onClick={copyTextToClipboard}>
					<ClipboardIcon className="h-6 w-6 text-white" />
				</Button>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="flex items-baseline gap-10">
					<div className="flex-1">
						<div className="mb-6">
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Title
							</label>
							<input
								type="text"
								name="title"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="title"
								value={title}
								autoFocus
								required
								onChange={handleTitleChange}
							/>
						</div>

						<div className="mb-6">
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Description
							</label>
							<textarea
								name="description"
								value={description}
								className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								onChange={handleDescriptionChange}
							/>
						</div>
					</div>

					<div className="mb-6 flex-1">
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
				</div>

				<div className="flex place-content-end gap-5">
					<Button type="submit">{isNew ? 'Create ' : 'Update'}</Button>
				</div>
			</form>
		</>
	);
};
