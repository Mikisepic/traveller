import React, { useEffect, useState } from 'react';

import axios from 'axios';
import {
	BookmarkIcon,
	BookmarkSlashIcon,
	TrashIcon,
	StarIcon,
} from '@heroicons/react/24/outline';
import Map, { MapLayerMouseEvent, Marker, Popup } from 'react-map-gl';

import { PopupDialog } from './popup-dialog';
import { Pin, Coordinates, Viewport } from './types';

interface Props {
	style: string;
}

export const MapWrapper: React.FC<Props> = ({ style }) => {
	// Map
	const [viewport, setViewport] = useState<Viewport>({
		lat: 54.69034904148157,
		lng: 25.27197473935047,
		zoom: 5,
	});
	const [currentPlaceId, setCurrentPlaceId] = useState<string | null>(null);
	const [selectedStyle, setSelectedStyle] = useState<string>(style);

	// Markers
	const [pins, setPins] = useState<Pin[]>([]);
	const [newPlace, setNewPlace] = useState<Coordinates | null>(null);

	const getPins = async () => {
		try {
			const allPins = await axios.get(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/places/`,
			);
			setPins(allPins.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getPins();
	}, []);

	const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStyle = e.target.value;
		setSelectedStyle(newStyle);
	};

	const handleMarkerClick = (id: string, lat: number, lng: number) => {
		setCurrentPlaceId(id);
		setViewport({ ...viewport, lat, lng });
	};

	const handleAddClick = ({ lngLat }: MapLayerMouseEvent) => {
		const { lat, lng } = lngLat;

		setNewPlace({
			lat,
			lng,
		});
	};

	const handleDelete = async (id: string) => {
		try {
			await axios.delete(
				`${(import.meta as any).env.VITE_BACKEND_API}/api/places/${id}`,
			);
		} catch (err) {
			console.error(err);
		}

		getPins();
	};

	const handleBookmarking = async (p: Pin) => {
		try {
			await axios.patch(
				`${
					(import.meta as any).env.VITE_BACKEND_API
				}/api/places/${currentPlaceId}`,
				{
					title: p.title,
					lat: p.lat,
					lng: p.lng,
					isBookmarked: !p.isBookmarked,
				},
			);

			getPins();
		} catch (err) {
			console.error(err);
		}
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
				{pins.map((p) => (
					<div key={p.id}>
						<Marker
							latitude={p.lat}
							longitude={p.lng}
							onClick={() => handleMarkerClick(p.id, p.lat, p.lng)}
						></Marker>
						{p.id === currentPlaceId && (
							<Popup
								key={p.id}
								latitude={p.lat}
								longitude={p.lng}
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
											{p.title}
										</p>
										<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
											About
										</h5>
										<p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400">
											{p.description}
										</p>
									</div>

									<div className="mb-6 flex">
										<h1 className="font-bold text-2xl">{p.priority}</h1>{' '}
										<StarIcon className="w-8 h-8 text-yellow-400" />
									</div>

									<button
										type="button"
										className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700"
										onClick={() => handleDelete(p.id)}
									>
										<TrashIcon className="h-6 w-6 text-white" />
									</button>

									<button
										type="button"
										className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
										onClick={() => handleBookmarking(p)}
									>
										{p.isBookmarked ? (
											<BookmarkSlashIcon className="h-6 w-6 text-white" />
										) : (
											<BookmarkIcon className="h-6 w-6 text-white" />
										)}
									</button>
								</div>
							</Popup>
						)}
					</div>
				))}

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
								pins={pins}
								setPins={setPins}
								newPlace={newPlace}
								setNewPlace={setNewPlace}
							/>
						</Popup>
					</>
				)}
			</Map>
		</>
	);
};
