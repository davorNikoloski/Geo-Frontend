export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null
};

export interface User {
  id: string;
  username: string;
  email: string;
  firstname: string;  
  lastname: string;
  is_admin: boolean;
}