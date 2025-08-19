import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'creator' | 'job_seeker' | 'employer';
  exp: number;
  iat: number;
}


const decodeBase64 = (input: string): any => {
  // Normalize padding and replace URL-safe chars if present
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4;
  if (padding === 2) base64 += '==';
  else if (padding === 3) base64 += '=';
  else if (padding !== 0) base64 += '==='; // be forgiving
  const json = atob(base64);
  return JSON.parse(json);
};

export const decodeToken = (token: string): DecodedToken => {
  try {
    // If it looks like a JWT (header.payload.signature), use jwtDecode
    if (token.includes('.')) {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded as DecodedToken;
    }
  } catch (_) {
    // fall through to base64 decoding
  }

  try {
    const decoded = decodeBase64(token);
    return decoded as DecodedToken;
  } catch (_) {
    throw new Error('Invalid token');
  }
};

export const verifyToken = (token: string): DecodedToken => {
  const decoded = decodeToken(token);
  const currentTime = Date.now() / 1000;
  // If token has no exp, accept it for 24h from iat if available
  const exp = typeof decoded.exp === 'number' ? decoded.exp : (
    typeof decoded.iat === 'number' ? decoded.iat + 24 * 60 * 60 : currentTime + 60
  );
  if (exp < currentTime) {
    throw new Error('Token has expired');
  }
  return decoded;
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setStoredToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeStoredToken = (): void => {
  localStorage.removeItem('token');
}; 