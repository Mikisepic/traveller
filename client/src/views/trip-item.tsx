import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pin } from '../components/map';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { TripPayload } from './types';

export const TripItem = () => {
	const { pathname } = useLocation();

	const [pins, setPins] = useState<Pin[]>([]);
	const isNew = pathname.includes('new');

	const [locations, setLocations] = useState<Pin[]>([]);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const getPins = async () => {
		try {
			const allPins = await axios.get(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/places/`,
			);
			setPins(allPins.data);
		} catch (err) {
			console.error(err);
		}
	};

	const getTrip = async () => {
		try {
			const currentTrip = await axios.get(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/${pathname
					.split('/')
					.pop()}`,
			);
			console.log(currentTrip);
			setTitle(currentTrip.data.title);
			setDescription(currentTrip.data.description);
			setLocations(currentTrip.data.locations);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getPins();
		if (!isNew) getTrip();
	}, []);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDescription(e.target.value);

	const handleCheckboxClick = (loc: Pin) => {
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

			try {
				if (isNew) {
					await axios.post(
						`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/`,
						payload,
					);
				} else {
					await axios.patch(
						`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/`,
						payload,
					);
				}
			} catch (err) {
				console.error(err);
			}
		}
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
						{pins.length > 0
							? pins.map((pin, index) => (
									<li key={index}>
										<div className="flex items-center mb-4">
											<button
												type="button"
												className="flex gap-5"
												onClick={() => handleCheckboxClick(pin)}
											>
												<CheckCircleIcon
													className={[
														'h-6 w-6 border rounded-full text-white',
														locations.indexOf(pin) > -1
															? 'bg-green-500'
															: 'bg-red-500',
													].join(' ')}
												/>
												{pin.title}
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
