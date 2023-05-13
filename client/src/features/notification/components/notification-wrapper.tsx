import React, { useContext, useEffect, useState } from 'react';

import { BellAlertIcon } from '@heroicons/react/24/outline';

import { LoadingSpinner } from '@traveller-ui/components/loading';
import {
	fetchNotifications,
	selectNotificationLoading,
} from '@traveller-ui/features/notification/store';
import { NotificationListenerContext } from '@traveller-ui/providers/notification-listener';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';

import { NotificationCount } from './notification-count';
import { NotificationDropdown } from './notification-dropdown';

export const NotificationWrapper: React.FC = () => {
	const { notificationListener } = useContext(NotificationListenerContext);

	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectNotificationLoading);

	const [show, setShow] = useState(false);

	const onBellClick = () => setShow(!show);

	useEffect(() => {
		dispatch(fetchNotifications());
	}, []);

	useEffect(() => {
		dispatch(fetchNotifications());
	}, [notificationListener]);

	return (
		<>
			{show && (
				<div className="relative">
					<div className="absolute top-[30px] right-[-30px] z-10 max-h-[200px] w-[300px] overflow-auto bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
						{loading && <LoadingSpinner />}
						<NotificationDropdown />
					</div>
				</div>
			)}

			<button
				type="button"
				className="relative inline-flex items-center p-2 mr-4 text-sm font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
				onClick={onBellClick}
			>
				<BellAlertIcon className="h-6 w-6 text-white" />
				<NotificationCount />
			</button>
		</>
	);
};
