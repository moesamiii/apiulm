import { secureSet, secureGet, secureRemove } from "./secureStorage";

const TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function saveToken(token) {
  if (token) {
    secureSet(TOKEN_KEY, token);
  }
}

export function getToken() {
  return secureGet(TOKEN_KEY);
}

export function clearToken() {
  secureRemove(TOKEN_KEY);
}

export function saveRefreshToken(refreshToken) {
  if (refreshToken) {
    secureSet(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function getRefreshToken() {
  return secureGet(REFRESH_TOKEN_KEY);
}

export function clearRefreshToken() {
  secureRemove(REFRESH_TOKEN_KEY);
}
