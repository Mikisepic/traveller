import React from 'react';

interface Props {
	count: number;
}

export const NotificationCount: React.FC<Props> = ({ count }) => {
	return (
		<div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -right-3 dark:border-gray-900">
			{count}
		</div>
	);
};
