import React, { useContext } from 'react';

import { TrashIcon } from '@heroicons/react/24/outline';

import { Button } from '@traveller-ui/components/button';
import { selectNotifications } from '@traveller-ui/features/notification/store';
import { NotificationListenerContext } from '@traveller-ui/providers';
import { useAppSelector } from '@traveller-ui/store';
import { deleteNotification } from '../services';

export const NotificationDropdown: React.FC = () => {
	const { setNotificationListener } = useContext(NotificationListenerContext);

	const notifications = useAppSelector(selectNotifications);

	const onRemove = (id: string) => {
		deleteNotification(id);
		setNotificationListener(Math.random() * 100);
	};

	return (
		<div className="relative shadow-md sm:rounded-lg">
			{notifications.results.length > 0 ? (
				notifications.results.map(({ id, title, body }) => (
					<div
						key={id}
						className="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
					>
						<h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
							{title}
						</h5>

						<div className="flex items-center justify-between">
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{body}
							</p>

							<Button onClick={() => onRemove(id)} theme="danger">
								<TrashIcon className="w-4 h-4 text-white" />
							</Button>
						</div>
					</div>
				))
			) : (
				<h1 className="text-2xl p-4 font-bold text-center leading-none tracking-tight text-gray-900 dark:text-white">
					No records
				</h1>
			)}
		</div>
	);
};
