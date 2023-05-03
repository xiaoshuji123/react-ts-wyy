import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import App from '../App';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
		children: []
	}
];

const router = createBrowserRouter(routes);

export default router;
