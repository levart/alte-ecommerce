export interface Auth {
  email: string;
  password: string;
  returnSecureToken: boolean;
}


export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
