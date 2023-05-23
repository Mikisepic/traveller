import React, { useContext } from 'react';

import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { Button } from '@traveller-ui/components/button';
import { Coordinates, Place } from '@traveller-ui/features/map/types';
import { createNotification } from '@traveller-ui/features/notification/services';
import { NotificationListenerContext } from '@traveller-ui/providers/';
import { useAppDispatch } from '@traveller-ui/store';

import { Error } from '@traveller-ui/components/error';
import { useFormik } from 'formik';
import { createPlace, fetchPlaces } from '../services/place.service';
import { setPlacesLoading } from '../store';

interface Props {
	newPlace: Coordinates | null;
	setNewPlace: React.Dispatch<React.SetStateAction<Coordinates | null>>;
}

export const PopupDialog: React.FC<Props> = ({ newPlace, setNewPlace }) => {
	const { setNotificationListener } = useContext(NotificationListenerContext);

	const dispatch = useAppDispatch();

	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			isBookmarked: false,
			priority: 1,
		},
		onSubmit: ({ title, description, isBookmarked, priority }) => {
			const payload: Place = {
				id: uuidv4(),
				title,
				description,
				lat: parseFloat(newPlace!.lat.toFixed(6)),
				lng: parseFloat(newPlace!.lng.toFixed(6)),
				isBookmarked,
				priority,
			};

			createPlace(payload);
			createNotification({
				title: 'New Location Created!',
				body: 'You have created a new location instance.',
			});
			setNotificationListener(Math.random() * 100);
			setNewPlace(null);
			dispatch(setPlacesLoading());
			fetchPlaces();
		},
		validationSchema: Yup.object({
			title: Yup.string().trim().required('Title is required'),
			priority: Yup.number()
				.min(1, 'Minimum value is 1')
				.max(1, 'Maximum value is 5'),
		}),
	});

	return (
		<div className="p-5">
			<form onSubmit={formik.handleSubmit}>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="title"
						placeholder=" "
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						value={formik.values.title}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Header
					</label>
					{formik.errors.title && <Error message={formik.errors.title} />}
				</div>

				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="description"
						placeholder=" "
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						value={formik.values.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
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
						value={formik.values.priority}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>

				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
};
