import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterForm } from '@traveller-ui/features/auth/components/register-form';
import { selectAccount } from '@traveller-ui/features/auth/store';
import { Header } from '@traveller-ui/layouts/header';
import { useAppSelector } from '@traveller-ui/store';

export const Register: React.FC = () => {
	const account = useAppSelector(selectAccount);
	const navigate = useNavigate();

	useEffect(() => {
		if (!!account) navigate('/profile');
	}, []);

	return (
		<>
			<Header title="Register" description="Create a new account" />
			<RegisterForm />
		</>
	);
};
