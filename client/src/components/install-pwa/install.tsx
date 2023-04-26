import React, { useEffect, useState } from 'react';

import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

export const InstallComponent = () => {
	const [supportsPWA, setSupportsPWA] = useState(false);
	const [promptInstall, setPromptInstall] = useState<any>(null);

	useEffect(() => {
		const handler = (e: any) => {
			e.preventDefault();
			setSupportsPWA(true);
			setPromptInstall(e);
		};
		window.addEventListener('beforeinstallprompt', handler);

		return () => window.removeEventListener('transitionend', handler);
	}, []);

	const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (!promptInstall) {
			return;
		}
		promptInstall.prompt();
	};

	if (!supportsPWA) {
		return null;
	}

	return (
		<button
			className="p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4"
			id="setup_button"
			aria-label="Install app"
			title="Install app"
			onClick={onClick}
		>
			<ArrowDownCircleIcon className="w-6 h-6 text-white" />
		</button>
	);
};
