import axios from 'axios';

export default axios.create({
	baseURL: `${(import.meta as any).env.VITE_BACKEND_API}`,
	responseType: 'json',
});
