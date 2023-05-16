import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { selectAccount } from '@traveller-ui/features/auth/store';
import { useAppSelector } from '@traveller-ui/store';
import { PageNotFound } from './page-not-found';

export const Protected: React.FC<RouteProps> = (props) => {
	const account = useAppSelector(selectAccount);

	if (account) {
		if (props.path === '/login') {
			return <PageNotFound />;
		}
		return <Route {...props} />;
	} else if (!account) {
		return <PageNotFound />;
	} else {
		return <div>Not found</div>;
	}
};
