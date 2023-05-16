import React, { useEffect } from 'react';

import { ProfileDashboard } from '@traveller-ui/features/auth/components';
import { selectAccount } from '@traveller-ui/features/auth/store';
import { Header } from '@traveller-ui/layouts/header';
import { useAppSelector } from '@traveller-ui/store';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
	const account = useAppSelector(selectAccount);
	const navigate = useNavigate();

	useEffect(() => {
		if (!account) {
			navigate('/login');
		}
	}, []);

	return (
		<>
			<Header title="Profile" description="Preview your profile" />
			<ProfileDashboard />
		</>
	);
};
