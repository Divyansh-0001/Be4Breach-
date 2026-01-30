import { API_BASE_URL, fetchJson } from "./api";
import type { AuthRole, AuthSession } from "./auth";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  company?: string;
};

type LoginResponse = {
  access_token: string;
  role: AuthRole;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
};

export async function loginWithRole(
  role: AuthRole,
  payload: LoginPayload
): Promise<AuthSession> {
  const endpoint =
    role === "Admin" ? "/api/v1/auth/admin/login" : "/api/v1/auth/login";
  const response = await fetchJson<LoginResponse>(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });

  return {
    token: response.access_token,
    role: response.role ?? role,
    user: response.user,
  };
}

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthSession> {
  const response = await fetchJson<LoginResponse>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });

  return {
    token: response.access_token,
    role: response.role ?? "User",
    user: response.user,
  };
}

export async function loginWithGoogleIdToken(
  idToken: string,
  role: AuthRole
): Promise<AuthSession> {
  const response = await fetchJson<LoginResponse>("/api/v1/auth/google", {
    method: "POST",
    body: JSON.stringify({ id_token: idToken, role }),
    credentials: "include",
  });

  return {
    token: response.access_token,
    role: response.role ?? role,
    user: response.user,
  };
}

export async function getGoogleOAuthUrl(role: AuthRole): Promise<string> {
  const response = await fetchJson<{ url: string }>(
    `/api/v1/auth/google/url?role=${encodeURIComponent(role)}`,
    {
      credentials: "include",
    }
  );
  return response.url;
}

export function getGoogleOAuthFallbackUrl(role: AuthRole): string {
  return `${API_BASE_URL}/api/v1/auth/google/url?role=${encodeURIComponent(
    role
  )}`;
}
