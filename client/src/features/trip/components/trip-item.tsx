import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ClipboardIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@traveller-ui/components/button';
import { Error } from '@traveller-ui/components/error';
import { fetchPlaces } from '@traveller-ui/features/map/services';
import {
	selectPlaces,
	setPlacesLoading,
} from '@traveller-ui/features/map/store';
import { Place } from '@traveller-ui/features/map/types';
import { createNotification } from '@traveller-ui/features/notification/services';
import { selectTrip, setTripsLoading } from '@traveller-ui/features/trip/store';
import { TripPayload } from '@traveller-ui/features/trip/types';
import { Header } from '@traveller-ui/layouts/header';
import { NotificationListenerContext } from '@traveller-ui/providers';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';

import { createTrip, fetchTrip, updateTrip } from '../services';

export const TripItem = () => {
	const { setNotificationListener } = useContext(NotificationListenerContext);

	const dispatch = useAppDispatch();
	const trip = useAppSelector(selectTrip);
	const places = useAppSelector(selectPlaces);

	const { pathname } = useLocation();
	const navigate = useNavigate();

	const isNew = pathname.includes('new');

	const [locations, setLocations] = useState<string[]>([]);

	useEffect(() => {
		dispatch(setPlacesLoading());
		fetchPlaces();
		if (!isNew) {
			dispatch(setTripsLoading());
			fetchTrip(pathname.split('/').pop() as string);
		}
	}, []);

	useEffect(() => {
		if (trip) {
			formik.setValues({
				title: trip.title,
				description: trip.description,
				visible: trip.visible,
			});
			setLocations(trip.locations);
		}
	}, [trip]);

	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			visible: false,
		},
		onSubmit: ({ title, description, visible }) => {
			if (locations && title && description) {
				const payload: TripPayload = {
					title,
					description,
					locations,
					visible,
				};

				isNew ? createTrip(payload) : updateTrip(trip?.id as string, payload);

				createNotification({
					title: isNew ? 'New Trip Created!' : `Trip ${title} Updated!`,
					body: isNew
						? 'You have created a new trip.'
						: 'You have updated a trip instance',
				});
				setNotificationListener(Math.random() * 100);
				navigate('/trips');
			}
		},
		validationSchema: Yup.object({
			title: Yup.string().trim().required('Title is required'),
		}),
	});

	const handleCheckboxClick = (loc: Place) => {
		const index = locations.indexOf(loc.id);

		if (index !== -1) {
			setLocations(locations.splice(index, 1));
		} else {
			setLocations([...locations, loc.id]);
		}
	};

	const copyTextToClipboard = () => {
		navigator.clipboard.writeText(
			`${(import.meta as any).env.VITE_BACKEND_API}/api/trips/${
				trip?.shortened_url
			}`,
		);
	};

	return (
		<>
			<div className="flex items-center justify-between">
				<Header title="Trip" description="Manage your trip" />
				{!isNew && trip?.visible && (
					<Button onClick={copyTextToClipboard}>
						<ClipboardIcon className="h-6 w-6 text-white" />
					</Button>
				)}
			</div>

			<form onSubmit={formik.handleSubmit}>
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
								value={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.errors.title && <Error message={formik.errors.title} />}
						</div>

						<div className="mb-6">
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Description
							</label>
							<textarea
								name="description"
								className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						<div className="flex items-center">
							<input
								type="checkbox"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
								name="visible"
								checked={formik.values.visible}
								onChange={formik.handleChange}
							/>
							<label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Is Visible
							</label>
						</div>
					</div>

					<div className="mb-6 flex-1">
						<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Locations
						</label>
						<ul className="max-w-md max-h-[200px] overflow-y-auto space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
							{isNew
								? places.length > 0
									? places.map((place, index) => (
											<li key={index}>
												<div className="flex items-center">
													<input
														type="checkbox"
														checked={locations.includes(place.id)}
														onClick={() => handleCheckboxClick(place)}
														className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
													/>
													<label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
														{place.title}
													</label>
												</div>
											</li>
									  ))
									: 'No locations'
								: !!trip && trip.locations.length > 0
								? trip.locations.map((place, index) => (
										<li key={index}>
											<div className="flex items-center mb-4">{place}</div>
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
