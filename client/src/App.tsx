import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { TripItem } from './features/trip/components';
import { Footer } from './layouts/footer';
import { NavbarWrapper } from './layouts/navbar';
import { PageNotFound } from './pages/page-not-found';
import { routes } from './routes';
import { AppRoute } from './types';

export const App: React.FC = () => {
	const getRoutes = (routes: AppRoute[]) =>
		routes.map((prop, key) => (
			<Route key={key} path={prop.path} element={<prop.element />} />
		));

	return (
		<div className="container mx-auto ">
			<NavbarWrapper routes={routes} />

			<div className="mt-24">
				<Routes>
					{getRoutes(routes)}
					<Route path="/trips/new" element={<TripItem />} />
					<Route path="/trips/:id" element={<TripItem />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>

			<Footer />
		</div>
	);
};
