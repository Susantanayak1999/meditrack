import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Role = 'Admin' | 'Doctor' | 'Receptionist' | null;

interface AuthState {
  user: string | null;
  role: Role;
}

const initialState: AuthState = {
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; role: Role }>) => {
      state.user = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

// THIS IS THE MISSING LINE THAT CAUSES YOUR ERROR:
export default authSlice.reducer; 