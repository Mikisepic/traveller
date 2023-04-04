import React, { useState } from 'react';

import { Pin, Coordinates } from './types';

interface Props {
	pins: Pin[];
	setPins: React.Dispatch<React.SetStateAction<Pin[]>>;
	newPlace: Coordinates | null;
	setNewPlace: React.Dispatch<React.SetStateAction<Coordinates | null>>;
}

export const PopupDialog: React.FC<Props> = ({
	pins,
	setPins,
	newPlace,
	setNewPlace,
}) => {
	const [title, setTitle] = useState<string | null>(null);
	const [description, setDescription] = useState<string | null>(null);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDescription(e.target.value);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (newPlace && title && description) {
			const newPin: Pin = {
				id: (Math.random() * 1000).toString(),
				title,
				description,
				lat: newPlace.lat,
				lng: newPlace.lng,
				isBookmarked: false,
			};

			setPins([...pins, newPin]);
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
						Title
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
