import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Margin } from '@components';
import { EditProfile, Landing } from '@pages';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryCLient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryCLient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
