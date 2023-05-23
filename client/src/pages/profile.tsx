import React from 'react';

import {
	ProfileDashboard,
	Protected,
} from '@traveller-ui/features/auth/components';
import { Header } from '@traveller-ui/layouts/header';

export const Profile: React.FC = () => {
	return (
		<Protected>
			<Header title="Profile" description="Preview your profile" />
			<ProfileDashboard />
		</Protected>
	);
};
