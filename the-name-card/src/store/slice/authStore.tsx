import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	token: '',
	name: '',
	email: '',
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		saveToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		saveName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		saveEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
		logout: (state) => {
			state.token = '';
			state.name = '';
			state.email = '';
			state.isAuthenticated = false;
		},
	},
});

export const { saveToken, saveName, saveEmail, setAuthenticated, logout } =
	authSlice.actions;

export default authSlice.reducer;
