import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Landing, Margin } from './components';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Landing />,
	},
]);

function App() {
	return (
		<Margin>
			<RouterProvider router={router} />
		</Margin>
	);
}

export default App;
