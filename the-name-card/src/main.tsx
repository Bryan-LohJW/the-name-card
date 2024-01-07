import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Landing, Margin } from './components';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Margin>
			<Landing />
		</Margin>
	</React.StrictMode>
);
