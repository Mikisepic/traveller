import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { App } from './App';
import { store } from './store';
import { NotificationListenerProvider } from './providers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<NotificationListenerProvider>
					<App />
				</NotificationListenerProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
