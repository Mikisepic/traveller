import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const path = require('path');

export default defineConfig({
	base: './',
	resolve: {
		alias: {
			'@traveller-ui': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'script',
			includeAssets: ['favicon.ico', 'icons/*.png'],
			devOptions: {
				enabled: true,
			},
			manifest: {
				name: 'Traveller',
				short_name: 'Traveller',
				start_url: '/',
				scope: '/',
				icons: [
					{
						src: 'icons/manifest-icon-144.maskable.png',
						sizes: '144x144',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'icons/manifest-icon-144.maskable.png',
						sizes: '144x144',
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
						src: 'icons/manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: 'icons/manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'icons/manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
				theme_color: '#000000',
				background_color: '#ffffff',
				display: 'fullscreen',
				orientation: 'portrait',
			},
		}),
	],
});
