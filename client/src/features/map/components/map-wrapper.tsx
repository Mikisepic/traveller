import React, { useContext, useEffect, useMemo, useState } from 'react';

import {
	BookmarkIcon,
	BookmarkSlashIcon,
	StarIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import Map, {
	GeolocateControl,
	Layer,
	MapLayerMouseEvent,
	Marker,
	NavigationControl,
	Popup,
	Source,
} from 'react-map-gl';

import { Button } from '@traveller-ui/components/button';
import { LoadingSpinner } from '@traveller-ui/components/loading';
import {
	selectAccount,
	selectUserSettings,
} from '@traveller-ui/features/auth/store';
import {
	clearPlaceState,
	selectOptimizations,
	selectPlace,
	selectPlaceLoading,
	selectPlaces,
	selectRoutes,
	selectWaypoints,
	setPlacesLoading,
} from '@traveller-ui/features/map/store';
import {
	Coordinates,
	MapboxOptimizationWaypoint,
	Place,
	PlacePayload,
	Viewport,
	markerColors,
} from '@traveller-ui/features/map/types';
import { createNotification } from '@traveller-ui/features/notification/services';
import { NotificationListenerContext } from '@traveller-ui/providers';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';

import { fetchTrips } from '@traveller-ui/features/trip/services';
import {
	selectTrips,
	setTripsLoading,
} from '@traveller-ui/features/trip/store';
import {
	deletePlace,
	fetchOptimization,
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
	const trips = useAppSelector(selectTrips);
	const optimizations = useAppSelector(selectOptimizations);
	const waypoints = useAppSelector(selectWaypoints);
	const routes = useAppSelector(selectRoutes);
	const loading = useAppSelector(selectPlaceLoading);
	const account = useAppSelector(selectAccount);
	const userSettings = useAppSelector(selectUserSettings);

	// Map
	const [viewport, setViewport] = useState<Viewport>({
		lat: 54.69034904148157,
		lng: 25.27197473935047,
		zoom: 13,
	});
	const [currentPlaceId, setCurrentPlaceId] = useState<string | null>(null);
	const [geometries, setGeometries] = useState<GeoJSON.Geometry[]>([]);

	// Markers
	const [newPlace, setNewPlace] = useState<Coordinates | null>(null);
	const [localPlaces, setLocalPlaces] = useState<Coordinates[]>([]);

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

	const localMarkers = useMemo(
		() =>
			localPlaces.map((p, index) => (
				<div key={index}>
					<Marker latitude={p.lat} longitude={p.lng}></Marker>
				</div>
			)),
		[localPlaces],
	);

	const optimizationMarkers = useMemo(
		() =>
			(waypoints as MapboxOptimizationWaypoint[])?.map((waypoint) => (
				<div key={waypoint.waypoint_index}>
					<Marker
						longitude={waypoint.location[0]}
						latitude={waypoint.location[1]}
						color={markerColors[waypoint.waypoint_index]}
					></Marker>
				</div>
			)),
		[waypoints],
	);

	useEffect(() => {
		if (!!account) {
			dispatch(setPlacesLoading());
			fetchPlaces();
			dispatch(setTripsLoading());
			fetchTrips(1);
		}
	}, []);

	useEffect(() => {
		if (!!optimizations) {
			const geometryGroups = optimizations[0].legs.map((leg) =>
				leg.steps.map((step) => step.geometry),
			);

			setGeometries(([] as GeoJSON.Geometry[]).concat(...geometryGroups));
		}
	}, [optimizations]);

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

		if (!!!account) {
			setLocalPlaces([
				...localPlaces,
				{
					lat,
					lng,
				},
			]);

			if (localPlaces.length > 0) {
				dispatch(setPlacesLoading());
				fetchOptimization('driving', [
					...localPlaces,
					{
						lat,
						lng,
					},
				]);
			}
		}
	};

	const handleRemoveClick = (waypoint_id: number) => {
		if (!!waypoints) {
			let ways = [...(waypoints as MapboxOptimizationWaypoint[])];
			const index = ways.findIndex(
				({ waypoint_index }) => waypoint_index === waypoint_id,
			);

			if (index > -1) {
				ways.splice(index, 1);

				const coords = ways.map(({ location }) => {
					return {
						lat: location[1],
						lng: location[0],
					};
				});
				setLocalPlaces(coords);
				dispatch(setPlacesLoading());
				fetchOptimization('driving', coords);
			}
		}
	};

	const handleDelete = (id: string, title: string) => {
		const confirmation = confirm(`Delete map marker ${title}?`);

		if (confirmation) {
			deletePlace(id);

			createNotification({
				title: `Location ${title} Deleted!`,
				body: 'You have deleted a location.',
			});
			setNotificationListener(Math.random() * 100);

			dispatch(setPlacesLoading());
			fetchPlaces();
		}
	};

	const handleTripOptimize = (trip_id: string) => {
		const selectedTrip = trips.results.find(({ id }) => id === trip_id);

		if (!!selectedTrip) {
			const coords = selectedTrip.locations.map(({ lat, lng }) => ({
				lat,
				lng,
			}));

			dispatch(setPlacesLoading());
			fetchOptimization('driving', coords);
		}
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

	const sortOptimization = () =>
		[...(waypoints as MapboxOptimizationWaypoint[])].sort((a, b) =>
			a.waypoint_index < b.waypoint_index ? -1 : 1,
		);

	return (
		<>
			{loading && <LoadingSpinner />}

			<div className="flex items-center justify-between gap-10">
				<ul className=" flex-1 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
					{!!waypoints &&
						sortOptimization().map(({ waypoint_index, name }) => (
							<li className="pb-3 sm:pb-4" key={waypoint_index}>
								<div className="flex items-center justify-between space-x-4">
									<MapPinIcon
										style={{ color: markerColors[waypoint_index] }}
										className="w-6 h-6"
									/>

									<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
										{name || 'No Name'}
									</p>

									<Button
										theme="danger"
										onClick={() => handleRemoveClick(waypoint_index)}
									>
										<TrashIcon className="h-6 w-6 text-white" />
									</Button>
								</div>
							</li>
						))}
				</ul>

				<div className="flex-1">
					{!!account && (
						<>
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Select a trip to optimize
							</label>
							<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								<option selected>Choose a country</option>
								{!!trips &&
									trips.results.map((trip) => (
										<option
											onClick={() => handleTripOptimize(trip.id)}
											value={trip.id}
										>
											{trip.title}
										</option>
									))}
							</select>
						</>
					)}
				</div>
			</div>

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

					{!!account && (
						<>
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
										<PopupDialog
											newPlace={newPlace}
											setNewPlace={setNewPlace}
										/>
									</Popup>
								</>
							)}
						</>
					)}

					{!!!account && <>{localMarkers.length < 2 && localMarkers}</>}

					{optimizationMarkers}

					{optimizations &&
						geometries.map((geometry, index) => (
							<Source key={index} type="geojson" data={geometry}>
								<Layer
									type="line"
									paint={{
										'line-color': '#0074D9',
										'line-width': 3,
									}}
								/>
							</Source>
						))}
				</Map>
			</div>
		</>
	);
};
