import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

const path = require('path');

export default defineConfig({
	resolve: {
		alias: {
			'@traveller-ui': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true,
			},
			includeAssets: ['icons/favicon.ico', 'icons/apple-touch-icon.png'],
			manifest: {
				name: 'Traveller',
				short_name: 'traveller',
				theme_color: '#ffffff',
				start_url: '/',
				icons: [
					{
						src: 'icons/manifest-icon-144.maskable.png',
						sizes: '144x144',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: 'icons/manifest-icon-144.maskable.png',
						sizes: '144x144',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'icons/manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: 'icons/manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'icons/manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: 'icons/manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any',
					},
				],
			},
		}),
	],
});
