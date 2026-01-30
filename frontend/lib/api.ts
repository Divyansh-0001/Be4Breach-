import { getSession } from "./auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

function getAuthHeader() {
  if (typeof window === "undefined") {
    return {};
  }
  const session = getSession();
  if (!session?.token) {
    return {};
  }
  return { Authorization: `Bearer ${session.token}` };
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers ?? {});
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const authHeader = getAuthHeader();
  if (authHeader.Authorization && !headers.has("Authorization")) {
    headers.set("Authorization", authHeader.Authorization);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "detail" in payload
        ? String((payload as { detail?: string }).detail)
        : `API request failed with status ${response.status}`;
    throw new ApiError(response.status, message, payload);
  }

  return payload as T;
}
