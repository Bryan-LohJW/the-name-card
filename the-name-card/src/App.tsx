import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Margin } from '@components';
import { EditProfile, Landing } from '@pages';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<QueryClientProvider client={queryCLient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
