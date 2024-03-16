import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';

import { Margin } from '@components';
import { EditProfile, Landing, Profile } from '@pages';
import { store } from '@store/store';

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
	{
		path: '/profile/:userEmail',
		element: <Profile />,
	},
]);

const queryCLient = new QueryClient();

function App() {
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<Provider store={store}>
				<QueryClientProvider client={queryCLient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</Provider>
		</GoogleOAuthProvider>
	);
}

export default App;
