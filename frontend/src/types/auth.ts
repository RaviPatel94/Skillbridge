// types/auth.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  yog? : number;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name?: string;
  yog: number;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  refreshToken?: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signUp: (data: SignUpRequest) => Promise<void>;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => void;
  refreshToken: () => Promise<void>;
}