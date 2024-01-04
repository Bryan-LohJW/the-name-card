import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Landing } from './components';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<div className="margins">
			<div className="content">
				<Landing />
			</div>
		</div>
	</React.StrictMode>
);
