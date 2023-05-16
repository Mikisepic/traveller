import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';
import { NotificationListenerProvider } from './providers';
import { persistor, store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<BrowserRouter>
					<NotificationListenerProvider>
						<App />
					</NotificationListenerProvider>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);
