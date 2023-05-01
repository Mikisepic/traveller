import React from 'react';

import { selectNotifications } from '@traveller-ui/features/notification/store';
import { useAppSelector } from '@traveller-ui/store';

export const NotificationCount: React.FC = () => {
	const notifications = useAppSelector(selectNotifications);
	return (
		<div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -right-3 dark:border-gray-900">
			{notifications.count}
		</div>
	);
};
