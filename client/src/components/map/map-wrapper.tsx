import React, { useEffect, useState } from 'react';

import {
	BookmarkIcon,
	BookmarkSlashIcon,
	TrashIcon,
	StarIcon,
} from '@heroicons/react/24/outline';
import Map, { MapLayerMouseEvent, Marker, Popup } from 'react-map-gl';

import {
	fetchPlace,
	fetchPlaces,
	selectPlaces,
	selectPlaceError,
	selectPlaceLoading,
	selectPlace,
	updatePlace,
	deletePlace,
} from '@traveller-ui/store/features/place';
import { useAppDispatch, useAppSelector } from '@traveller-ui/store';

import { PopupDialog } from './popup-dialog';
import { Place, Coordinates, Viewport, PlacePayload } from './types';

interface Props {
	style: string;
}

export const MapWrapper: React.FC<Props> = ({ style }) => {
	const dispatch = useAppDispatch();
	const places = useAppSelector(selectPlaces);
	const place = useAppSelector(selectPlace);
	const loading = useAppSelector(selectPlaceLoading);
	const error = useAppSelector(selectPlaceError);

	// Map
	const [viewport, setViewport] = useState<Viewport>({
		lat: 54.69034904148157,
		lng: 25.27197473935047,
		zoom: 5,
	});
	const [currentPlaceId, setCurrentPlaceId] = useState<string | null>(null);
	const [selectedStyle, setSelectedStyle] = useState<string>(style);

	// Markers
	const [newPlace, setNewPlace] = useState<Coordinates | null>(null);

	useEffect(() => {
		dispatch(fetchPlaces());
	}, []);

	const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStyle = e.target.value;
		setSelectedStyle(newStyle);
	};

	const handleMarkerClick = (id: string, lat: number, lng: number) => {
		setCurrentPlaceId(id);
		dispatch(fetchPlace(id));
		setViewport({ ...viewport, lat, lng });
	};

	const handleAddClick = ({ lngLat }: MapLayerMouseEvent) => {
		const { lat, lng } = lngLat;

		setNewPlace({
			lat,
			lng,
		});
	};

	const handleDelete = (id: string) => {
		dispatch(deletePlace(id));
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

		dispatch(updatePlace({ id: p.id, payload }));
	};

	return (
		<>
			<div className="mb-5">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Map mode
				</label>
				<select
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					value={selectedStyle}
					onChange={handleStyleChange}
				>
					<option value="">--Please choose an option--</option>
					<option value="satellite-streets-v12">Satellite Streets</option>
					<option value="light-v11">Light</option>
					<option value="dark-v11">Dark</option>
					<option value="streets-v12">Streets</option>
					<option value="outdoors-v12">Outdoors</option>
				</select>
			</div>

			<Map
				mapboxAccessToken={(import.meta as any).env.VITE_MAPBOX_ACCESS_TOKEN}
				initialViewState={{
					...viewport,
					latitude: viewport.lat,
					longitude: viewport.lng,
				}}
				doubleClickZoom={false}
				style={{ width: '100wv', height: '80vh' }}
				mapStyle={`mapbox://styles/mapbox/${selectedStyle}`}
				onDblClick={handleAddClick}
			>
				{places.map((p) => (
					<div key={p.id}>
						<Marker
							latitude={p.lat}
							longitude={p.lng}
							onClick={() => handleMarkerClick(p.id, p.lat, p.lng)}
						></Marker>
					</div>
				))}

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

							<button
								type="button"
								className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700"
								onClick={() => handleDelete(place.id)}
							>
								<TrashIcon className="h-6 w-6 text-white" />
							</button>

							<button
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
								onClick={() => handleBookmarking(place)}
							>
								{place.isBookmarked ? (
									<BookmarkSlashIcon className="h-6 w-6 text-white" />
								) : (
									<BookmarkIcon className="h-6 w-6 text-white" />
								)}
							</button>
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
			</Map>
		</>
	);
};
