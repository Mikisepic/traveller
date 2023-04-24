import React, { useEffect, useState } from 'react';

import { BellAlertIcon } from '@heroicons/react/24/outline';

import { useAppDispatch, useAppSelector } from '@traveller-ui/store';
import {
	fetchNotifications,
	selectNotifications,
} from '@traveller-ui/store/features/notification';

import { NotificationCount } from './notification-count';
import { NotificationDropdown } from './notification-dropdown';

interface Props {}

export const NotificationWrapper: React.FC<Props> = () => {
	const [show, setShow] = useState(false);
	const dispatch = useAppDispatch();
	const notifications = useAppSelector(selectNotifications);

	const onBellClick = () => setShow(!show);

	useEffect(() => {
		dispatch(fetchNotifications());
	}, []);

	return (
		<>
			{show && (
				<div className="absolute">
					<div className="z-10 relative top-28 right-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
						<NotificationDropdown notifications={notifications} />
					</div>
				</div>
			)}

			<button
				type="button"
				className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				onClick={onBellClick}
			>
				<BellAlertIcon className="h-6 w-6 text-white" />
				<NotificationCount count={notifications.count} />
			</button>
		</>
	);
};
