import React, { useEffect, useState } from 'react';

import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

import { Button } from '../button';

export const Install = () => {
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
		<Button onClick={onClick}>
			<ArrowDownCircleIcon className="w-6 h-6 text-white" />
		</Button>
	);
};
