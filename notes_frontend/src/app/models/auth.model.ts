export interface User {
  id: string;
  email: string;
  displayName?: string | null;
  avatarUrl?: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends Credentials {
  displayName?: string;
}
