export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = async (endpoint: string, options: RequestInit) => {
  const opts = {
    ...options,
  };

  return fetch(`${API_BASE_URL}${endpoint}`, opts);
};
