import React from 'react';

import { MapWrapper } from '../components/map';

export const Map: React.FC = () => {
	return (
		<>
			<h1 className="text-4xl mb-5 font-bold dark:text-white">
				Map
				<small className="ml-2 text-base font-semibold text-gray-500 dark:text-gray-400">
					Navigate and find destinations
				</small>
			</h1>
			<MapWrapper style="light-v11" />
		</>
	);
};
