import React, { useContext, useEffect, useMemo, useState } from 'react';

import {
	BookmarkIcon,
	BookmarkSlashIcon,
	StarIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import Map, {
	GeolocateControl,
	MapLayerMouseEvent,
	Marker,
	NavigationControl,
	Popup,
} from 'react-map-gl';

import { Button } from '@traveller-ui/components/button';
import { LoadingSpinner } from '@traveller-ui/components/loading';
import {
	selectAccount,
	selectUserSettings,
} from '@traveller-ui/features/auth/store';
import {
	clearPlaceState,
	selectGeometries,
	selectPlace,
	selectPlaceLoading,
	selectPlaces,
	setPlacesLoading,
} from '@traveller-ui/features/map/store';
import {
	Coordinates,
	Place,
	PlacePayload,
	Viewport,
} from '@traveller-ui/features/map/types';
import { createNotification } from '@traveller-ui/features/notification/services';
import { NotificationListenerContext } from '@traveller-ui/providers';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';

import {
	deletePlace,
	fetchGeometries,
	fetchPlace,
	fetchPlaces,
	updatePlace,
} from '../services';
import { PopupDialog } from './popup-dialog';

export const MapWrapper: React.FC = () => {
	const { setNotificationListener } = useContext(NotificationListenerContext);

	const dispatch = useAppDispatch();

	const places = useAppSelector(selectPlaces);
	const place = useAppSelector(selectPlace);
	const geometries = useAppSelector(selectGeometries);
	const loading = useAppSelector(selectPlaceLoading);
	const account = useAppSelector(selectAccount);
	const userSettings = useAppSelector(selectUserSettings);

	// Map
	const [viewport, setViewport] = useState<Viewport>({
		lat: 54.69034904148157,
		lng: 25.27197473935047,
		zoom: 5,
	});
	const [currentPlaceId, setCurrentPlaceId] = useState<string | null>(null);

	// Markers
	const [newPlace, setNewPlace] = useState<Coordinates | null>(null);

	const markers = useMemo(
		() =>
			places.map((p) => (
				<div key={p.id}>
					<Marker
						latitude={p.lat}
						longitude={p.lng}
						onClick={() => handleMarkerClick(p.id, p.lat, p.lng)}
					></Marker>
				</div>
			)),
		[places],
	);

	useEffect(() => {
		if (!!account) {
			dispatch(setPlacesLoading());
			fetchPlaces();
		}

		dispatch(setPlacesLoading());
		// TODO make dynamic
		fetchGeometries(
			{ lat: 24.118706, lng: 55.319177 },
			{ lat: 14.221413, lng: 48.190892 },
		);
	}, []);

	useEffect(() => {
		return () => {
			dispatch(clearPlaceState());
		};
	}, []);

	const handleMarkerClick = (id: string, lat: number, lng: number) => {
		setCurrentPlaceId(id);
		setViewport({ ...viewport, lat, lng });

		dispatch(setPlacesLoading());
		fetchPlace(id);
	};

	const handleAddClick = ({ lngLat }: MapLayerMouseEvent) => {
		const { lat, lng } = lngLat;

		setNewPlace({
			lat,
			lng,
		});
	};

	const handleDelete = (id: string, title: string) => {
		deletePlace(id);

		createNotification({
			title: `Location ${title} Deleted!`,
			body: 'You have deleted a location.',
		});
		setNotificationListener(Math.random() * 100);

		dispatch(setPlacesLoading());
		fetchPlaces();
	};

	const handleBookmarking = async (p: Place) => {
		const payload: PlacePayload = {
			title: p.title,
			description: p.description,
			lat: p.lat,
			lng: p.lng,
			priority: p.priority,
			isBookmarked: !p.isBookmarked,
		};

		updatePlace(p.id, payload);
		createNotification({
			title: `Location ${p.title} ${
				!p.isBookmarked ? 'Bookmarked' : 'Unbookmarked'
			}!`,
			body: `You have ${
				!p.isBookmarked ? 'bookmarked' : 'unbookmarked'
			}  a location.`,
		});
		setNotificationListener(Math.random() * 100);
	};

	return (
		<>
			{loading && <LoadingSpinner />}

			<div className={loading ? 'opacity-20' : ''}>
				<Map
					mapboxAccessToken={(import.meta as any).env.VITE_MAPBOX_ACCESS_TOKEN}
					initialViewState={{
						...viewport,
						latitude: viewport.lat,
						longitude: viewport.lng,
					}}
					doubleClickZoom={false}
					style={{ width: '100wv', height: '80vh' }}
					mapStyle={`mapbox://styles/mapbox/${userSettings.mapStyle}`}
					onDblClick={handleAddClick}
				>
					<GeolocateControl />
					<NavigationControl />

					{markers}

					{place && place.id === currentPlaceId && (
						<Popup
							key={place.id}
							latitude={place.lat}
							longitude={place.lng}
							closeButton={true}
							closeOnClick={false}
							onClose={() => setCurrentPlaceId(null)}
							offset={[0, -40]}
							anchor="bottom"
						>
							<div className="max-w-sm p-3 bg-white dark:bg-gray-800">
								<div className="mb-5">
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										Place
									</h5>
									<p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400">
										{place.title}
									</p>
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										About
									</h5>
									<p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400">
										{place.description}
									</p>
								</div>

								<div className="mb-6 flex">
									<h1 className="font-bold text-2xl">{place.priority}</h1>{' '}
									<StarIcon className="w-8 h-8 text-yellow-400" />
								</div>

								<Button onClick={() => handleDelete(place.id, place.title)}>
									<TrashIcon className="h-6 w-6 text-white" />
								</Button>

								<Button onClick={() => handleBookmarking(place)}>
									{place.isBookmarked ? (
										<BookmarkSlashIcon className="h-6 w-6 text-white" />
									) : (
										<BookmarkIcon className="h-6 w-6 text-white" />
									)}
								</Button>
							</div>
						</Popup>
					)}

					{newPlace && (
						<>
							<Marker latitude={newPlace.lat} longitude={newPlace.lng} />
							<Popup
								latitude={newPlace.lat}
								longitude={newPlace.lng}
								closeButton={true}
								closeOnClick={false}
								onClose={() => setNewPlace(null)}
								offset={[0, -40]}
								anchor="bottom"
							>
								<PopupDialog newPlace={newPlace} setNewPlace={setNewPlace} />
							</Popup>
						</>
					)}

					{/* {geometries &&
						geometries.map((geometry, index) => (
							<Source key={index} type="geojson" data={geometry}>
								<Layer
									type="line"
									paint={{
										'line-color': '#0074D9',
										'line-width': 2,
									}}
								/>
							</Source>
						))} */}
				</Map>
			</div>
		</>
	);
};
