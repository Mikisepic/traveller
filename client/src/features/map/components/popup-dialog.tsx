import React, { useState } from 'react';

import { Coordinates, PlacePayload } from '@traveller-ui/features/map/types';
import { createPlace } from '@traveller-ui/features/map/store';
import { useAppDispatch } from '@traveller-ui/store';

interface Props {
	newPlace: Coordinates | null;
	setNewPlace: React.Dispatch<React.SetStateAction<Coordinates | null>>;
}

export const PopupDialog: React.FC<Props> = ({ newPlace, setNewPlace }) => {
	const dispatch = useAppDispatch();

	const [title, setTitle] = useState<string | null>(null);
	const [description, setDescription] = useState<string | null>(null);
	const [priority, setPriority] = useState<string | null>(null);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDescription(e.target.value);

	const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPriority(e.target.value);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (newPlace && title && description && priority) {
			const payload: PlacePayload = {
				title,
				description,
				lat: parseFloat(newPlace.lat.toFixed(6)),
				lng: parseFloat(newPlace.lng.toFixed(6)),
				isBookmarked: false,
				priority: parseInt(priority),
			};

			dispatch(createPlace(payload));
			setNewPlace(null);
		}
	};

	return (
		<div className="p-5">
			<form onSubmit={handleSubmit}>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="title"
						placeholder=" "
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						required
						autoFocus
						onChange={handleTitleChange}
					/>
					<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Header
					</label>
				</div>

				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="description"
						placeholder=" "
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						required
						autoFocus
						onChange={handleDescriptionChange}
					/>
					<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Description
					</label>
				</div>

				<div className="mb-6">
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Importance
					</label>
					<input
						type="number"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder=""
						required
						min={1}
						max={5}
						onChange={handlePriorityChange}
					/>
				</div>

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Submit
				</button>
			</form>
		</div>
	);
};
