import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
};

// Define the payload structure for the login action
interface LoginPayload {
  email: string;
  password: string;
}

const MOCK_EMAIL = "a@gmail.com";
const MOCK_PASSWORD = "123456";

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { email, password } = action.payload;
      if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.error = "Invalid email or password.";
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
