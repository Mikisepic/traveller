import React from 'react';
import { FooterWrapper } from './components/footer';

import { MapWrapper } from './components/map';
import { NavbarWrapper } from './components/navbar';

export const App: React.FC = () => {
	return (
		<div className="container mx-auto ">
			<NavbarWrapper />

			<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
				We invest in the world's potential
			</h1>
			<p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
				Here at Traveller we focus on markets where technology, innovation, and
				capital can unlock long-term value and drive economic growth.
			</p>

			<p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
				Track work across the enterprise through an open, collaborative
				platform. Link issues across Jira and ingest data from other software
				development tools, so your IT support and operations teams have richer
				contextual information to rapidly respond to requests, incidents, and
				changes.
			</p>
			<p className="text-gray-500 dark:text-gray-400">
				Deliver great service experiences fast - without the complexity of
				traditional ITSM solutions.Accelerate critical development work,
				eliminate toil, and deploy changes with ease, with a complete audit
				trail for every change.
			</p>

			<MapWrapper style="dark-v11" />

			<FooterWrapper />
		</div>
	);
};
