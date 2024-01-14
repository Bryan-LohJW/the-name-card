import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { EditProfile, Landing, Margin } from './components';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Landing />,
	},
	{
		path: '/edit-profile',
		element: <EditProfile />,
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
