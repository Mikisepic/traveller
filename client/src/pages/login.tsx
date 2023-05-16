import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '@traveller-ui/features/auth/components';
import { selectAccount } from '@traveller-ui/features/auth/store';
import { Header } from '@traveller-ui/layouts/header';
import { useAppSelector } from '@traveller-ui/store';

export const Login: React.FC = () => {
	const account = useAppSelector(selectAccount);
	const navigate = useNavigate();

	useEffect(() => {
		if (!!account) {
			navigate('/profile');
		}
	}, []);

	return (
		<>
			<Header title="Log In" description="Log in to your account" />
			<LoginForm />
		</>
	);
};
