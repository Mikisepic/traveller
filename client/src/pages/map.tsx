import React from 'react';

import { MapWrapper } from '@traveller-ui/features/map/components';
import { Header } from '@traveller-ui/layouts/header';

export const Map: React.FC = () => {
	return (
		<>
			<Header title="Map" description="Navigate and find destinations" />
			<MapWrapper />
		</>
	);
};
