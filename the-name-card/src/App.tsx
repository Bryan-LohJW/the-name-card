import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { EditProfile, Landing, Margin } from './components';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Margin>
				<Landing />
			</Margin>
		),
	},
	{
		path: '/edit-profile',
		element: <EditProfile />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
