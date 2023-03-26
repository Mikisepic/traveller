import React, { useState } from 'react';
import Map, { MapLayerMouseEvent, Marker, Popup } from 'react-map-gl';

interface IProps {
	style: string;
}

interface Pin {
	id: string;
	title: string;
	description: string;
	lat: number;
	lng: number;
}

interface Viewport {
	longitude: number;
	latitude: number;
	zoom: number;
}

export const MapWrapper: React.FC<IProps> = ({ style }) => {
	// Map
	const [viewport, setViewport] = useState<Viewport>({
		longitude: 25.27197473935047,
		latitude: 54.69034904148157,
		zoom: 5,
	});
	const [currentPlaceId, setCurrentPlaceId] = useState<string | null>(null);
	const [selectedStyle, setSelectedStyle] = useState<string>(style);

	// Markers
	const [pins, setPins] = useState<Pin[]>([]);
	const [newPlace, setNewPlace] = useState<{
		lat: number;
		lng: number;
	} | null>(null);

	// Form control
	const [title, setTitle] = useState<string | null>(null);
	const [description, setDescription] = useState<string | null>(null);

	const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStyle = e.target.value;
		setSelectedStyle(newStyle);
	};

	const handleMarkerClick = (id: string, lat: number, lng: number) => {
		setCurrentPlaceId(id);
		setViewport({ ...viewport, latitude: lat, longitude: lng });
	};

	const handleAddClick = ({ lngLat }: MapLayerMouseEvent) => {
		const { lat, lng } = lngLat;

		setNewPlace({
			lat,
			lng,
		});
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDescription(e.target.value);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (newPlace && title && description) {
			const newPin: Pin = {
				id: (Math.random() * 1000).toString(),
				title,
				description,
				lat: newPlace.lat,
				lng: newPlace.lng,
			};

			setPins([...pins, newPin]);
			setNewPlace(null);
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
				mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
				initialViewState={{ ...viewport }}
				doubleClickZoom={false}
				style={{ width: '100wv', height: '70vh' }}
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
								anchor="left"
							>
								<div className="card">
									<label>Place</label>
									<h4 className="place">{p.title}</h4>
									<label>About</label>
									<p className="desc">{p.description}</p>
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
							anchor="left"
						>
							<div className="p-5">
								<form onSubmit={handleSubmit}>
									<div className="relative z-0 w-full mb-6 group">
										<input
											type="text"
											name="title"
											placeholder=" "
											className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											required
											autoFocus
											onChange={handleTitleChange}
										/>
										<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
											Title
										</label>
									</div>

									<div className="relative z-0 w-full mb-6 group">
										<input
											type="text"
											name="description"
											placeholder=" "
											className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											required
											autoFocus
											onChange={handleDescriptionChange}
										/>
										<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
											Description
										</label>
									</div>

									<button
										type="submit"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Submit
									</button>
								</form>
							</div>
						</Popup>
					</>
				)}
			</Map>
		</>
	);
};
