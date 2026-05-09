const BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };

  const res = await fetch(url, config);

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const err = await res.json();
      message = err.detail || message;
    } catch {}
    throw new ApiError(message, res.status);
  }

  return res.json();
}

export const api = {
  generateContent: (payload) =>
    request("/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getOptions: () => request("/options"),
};
