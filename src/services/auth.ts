import { checkResponse } from "./utils";
import { API_BASE } from "./constants";

export const refreshToken = async () => {
  return await fetch(`${API_BASE}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit | undefined
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      const json = await refreshData.json();
      if (!refreshData.ok) {
        return Promise.reject(refreshData);
      }

      localStorage.setItem("accessToken", json.accessToken);
      localStorage.setItem("refreshToken", json.refreshToken);

      const optionsUnified = options || { method: "GET", headers: {} };
      optionsUnified.headers = {
        ...optionsUnified.headers,
        Authorization: json.accessToken,
      };

      const res = await fetch(url, optionsUnified); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
