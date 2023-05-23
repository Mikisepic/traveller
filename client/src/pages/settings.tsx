import React from 'react';

import { Button } from '@traveller-ui/components/button';
import { Theme } from '@traveller-ui/components/theme';
import {
	resetUserSettings,
	selectUserSettings,
	setMapStyle,
} from '@traveller-ui/features/auth/store';
import { MapStyle } from '@traveller-ui/features/auth/types';
import { Header } from '@traveller-ui/layouts/header';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';

export const Settings: React.FC = () => {
	const dispatch = useAppDispatch();

	const userSettings = useAppSelector(selectUserSettings);

	const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStyle = e.target.value;
		dispatch(setMapStyle(newStyle as MapStyle));
	};

	const handleResetToDefaults = () => {
		dispatch(resetUserSettings());
	};
	return (
		<>
			<Header title="Settings" description="Customize your experience" />

			<div className="flex gap-5">
				<div className="flex gap-3 items-start flex-1">
					<h1 className="text-xl h-8 text-gray-900 dark:text-white">
						Dark mode
					</h1>
					<Theme />
				</div>

				<div className="flex-1 mb-5">
					<h1 className="mb-4 text-xl leading-none tracking-tight text-gray-900 dark:text-white">
						Map mode
					</h1>
					<select
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={userSettings.mapStyle}
						onChange={handleStyleChange}
					>
						<option value="satellite-streets-v12">Satellite Streets</option>
						<option value="light-v11">Light</option>
						<option value="dark-v11">Dark</option>
						<option value="streets-v12">Streets</option>
						<option value="outdoors-v12">Outdoors</option>
					</select>
				</div>
			</div>

			<Button onClick={handleResetToDefaults}>Reset to Defaults</Button>
		</>
	);
};
