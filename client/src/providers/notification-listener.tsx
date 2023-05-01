import React, { createContext, useState } from 'react';

export const NotificationListenerContext = createContext<{
	notificationListener: number;
	setNotificationListener: React.Dispatch<React.SetStateAction<number>>;
}>({
	notificationListener: 0,
	setNotificationListener: () => {},
});

interface Props {
	children: React.ReactNode;
}

export const NotificationListenerProvider: React.FC<Props> = ({ children }) => {
	// Trigger to re-render notifications
	const [notificationListener, setNotificationListener] = useState<number>(0);

	return (
		<NotificationListenerContext.Provider
			value={{ notificationListener, setNotificationListener }}
		>
			{children}
		</NotificationListenerContext.Provider>
	);
};
