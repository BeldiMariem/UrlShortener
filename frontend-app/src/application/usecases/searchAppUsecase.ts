import { IAppSearchResult } from "../../domain/interfaces/AppSearch";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function searchAppUsecase(
  appName: string,
  token: string
): Promise<IAppSearchResult> {
  const res = await fetch(`${API}/search/app?name=${encodeURIComponent(appName)}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Search failed: ${text}`);
  }

  return await res.json();
}
