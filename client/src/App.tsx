import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { FooterWrapper } from './components/footer';
import { NavbarWrapper } from './components/navbar';
import { AppRoute, routes } from './routes';
import { PageNotFound } from './views';

export const App: React.FC = () => {
	const getRoutes = (routes: AppRoute[]) =>
		routes.map((prop, key) => (
			<Route key={key} path={prop.path} element={<prop.element />} />
		));

	return (
		<div className="container mx-auto">
			<NavbarWrapper routes={routes} />

			<div className="mt-24">
				<Routes>
					{getRoutes(routes)}
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>

			<FooterWrapper />
		</div>
	);
};
