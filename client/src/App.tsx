import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { selectAccount } from '@traveller-ui/features/auth/store';
import { Footer } from '@traveller-ui/layouts/footer';
import { NavbarWrapper } from '@traveller-ui/layouts/navbar';
import { allRoutes, protectedRoutes, publicRoutes } from '@traveller-ui/routes';
import { useAppSelector } from '@traveller-ui/store';

export const App: React.FC = () => {
	const account = useAppSelector(selectAccount);

	return (
		<div className="container mx-auto ">
			<NavbarWrapper
				routes={
					!!account ? [...publicRoutes, ...protectedRoutes] : publicRoutes
				}
				isAuthenticated={!!account}
			/>

			<div className="mt-24">
				<Routes>
					{allRoutes.map((route, key) => (
						<Route key={key} path={route.path} element={route.element}>
							{!!route?.children &&
								route.children.map((child, key) => (
									<Route key={key} path={child.path} element={child.element} />
								))}
						</Route>
					))}
				</Routes>
			</div>

			<Footer />
		</div>
	);
};
