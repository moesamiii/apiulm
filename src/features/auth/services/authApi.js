export async function loginApi({ userId, password }, apiUrl) {
  const response = await fetch(`${apiUrl}/Authorization/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify({ user_id: userId, password }),
  });

  const data = await response.json();
  console.log("Login API response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  // IMPORTANT → token is in data.data.token
  return data.data; // will contain token, refreshToken, user info
}

export async function refreshTokenApi(refreshToken, apiUrl) {
  const response = await fetch(`${apiUrl}/Authorization/RefreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(refreshToken), // API expects raw string, not JSON object
  });

  const data = await response.json();
  console.log("RefreshToken API response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Refresh token failed");
  }

  return data.data; // will contain new token + refreshToken
}
