import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import { FooterWrapper } from './components/footer';
import { NavbarWrapper } from './components/navbar';
import { AppRoute, routes } from './routes';
import { PageNotFound, TripItem } from './views';

export const App: React.FC = () => {
	const getRoutes = (routes: AppRoute[]) =>
		routes.map((prop, key) => (
			<Route key={key} path={prop.path} element={<prop.element />} />
		));

	const [supportsPWA, setSupportsPWA] = useState(false);
	const [promptInstall, setPromptInstall] = useState<any>(null);

	useEffect(() => {
		const handler = (e: any) => {
			e.preventDefault();
			console.log('we are being triggered :D');
			setSupportsPWA(true);
			setPromptInstall(e);
		};
		window.addEventListener('beforeinstallprompt', handler);

		return () => window.removeEventListener('transitionend', handler);
	}, []);

	const onClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		evt.preventDefault();
		if (!promptInstall) {
			return;
		}
		promptInstall.prompt();
	};
	if (!supportsPWA) {
		return null;
	}

	return (
		<div className="container mx-auto">
			<NavbarWrapper routes={routes} />

			<div className="mt-24">
				<button
					className="link-button"
					id="setup_button"
					aria-label="Install app"
					title="Install app"
					onClick={(e) => onClick(e)}
				>
					Install
				</button>
				<Routes>
					{getRoutes(routes)}
					<Route path="/trips/new" element={<TripItem />} />
					<Route path="/trips/:id" element={<TripItem />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>

			<FooterWrapper />
		</div>
	);
};
