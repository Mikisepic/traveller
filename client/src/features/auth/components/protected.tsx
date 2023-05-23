import React from 'react';

import { selectAccount } from '@traveller-ui/features/auth/store';
import { Header } from '@traveller-ui/layouts/header';
import { useAppSelector } from '@traveller-ui/store';

interface Props {
	children: React.ReactNode;
}

export const Protected: React.FC<Props> = ({ children }) => {
	const account = useAppSelector(selectAccount);

	return !!account ? (
		<>{children}</>
	) : (
		<Header
			title="Unauthorized"
			description="You need to be authenticated to access this page"
		/>
	);
};
