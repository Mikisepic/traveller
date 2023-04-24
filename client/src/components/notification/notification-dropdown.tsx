import React from 'react';

import { Notification } from './types';
import { PaginatedList } from '@traveller-ui/types';

interface Props {
	notifications: PaginatedList<Notification>;
}

export const NotificationDropdown: React.FC<Props> = ({ notifications }) => {
	return (
		<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
			<li>
				<a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
					Dashboard
				</a>
			</li>
			<li>
				<a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
					Settings
				</a>
			</li>
			<li>
				<a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
					Earnings
				</a>
			</li>
			<li>
				<a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
					Sign out
				</a>
			</li>
		</ul>
	);
};
