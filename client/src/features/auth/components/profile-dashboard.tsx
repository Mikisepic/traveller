import { useNavigate } from 'react-router-dom';

import { Button } from '@traveller-ui/components/button';
import { clearBookmarkState } from '@traveller-ui/features/bookmark/store';
import { clearPlaceState } from '@traveller-ui/features/map/store';
import { clearTripState } from '@traveller-ui/features/trip/store';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';

import { clearAuthState, selectAccount } from '../store';

export const ProfileDashboard = () => {
	const dispatch = useAppDispatch();
	const account = useAppSelector(selectAccount);

	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(clearAuthState());
		dispatch(clearPlaceState());
		dispatch(clearBookmarkState());
		dispatch(clearTripState());
		navigate('/login');
	};

	return (
		<div className="w-full h-screen">
			<div className="flex items-center justify-start mt-10 gap-0.5">
				<h2 className="w-20 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
					Username
				</h2>
				<p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
					{account?.username}
				</p>
			</div>

			<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

			<div className="flex gap-0.5">
				<h2 className="w-20 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
					Email
				</h2>
				<p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
					{account?.email}
				</p>
			</div>

			<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

			<h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
				Total Instances
			</h2>

			<div className="flex items-center mt-5 justify-between">
				<div className="flex gap-0.5">
					<h2 className="text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
						Places
					</h2>
					<p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
						{account?.places.length}
					</p>
				</div>

				<div className="flex gap-0.5">
					<h2 className="text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
						Trips
					</h2>
					<p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
						{account?.trips.length}
					</p>
				</div>
			</div>

			<div className="flex place-content-end mt-10 gap-5">
				<Button theme="danger" onClick={handleLogout}>
					Logout
				</Button>
			</div>
		</div>
	);
};
