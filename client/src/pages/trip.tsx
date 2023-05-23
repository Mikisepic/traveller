import React from 'react';
import { Outlet } from 'react-router-dom';

import { Protected } from '@traveller-ui/features/auth/components';

export const Trip: React.FC = () => {
	return (
		<Protected>
			<Outlet />
		</Protected>
	);
};
