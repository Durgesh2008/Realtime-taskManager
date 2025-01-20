import { useState } from "react";
import { backendUrl } from "../constant";

const useDelete = <TResponse>(
  url: string,
  options?: {
    authToken?: string;
    headers?: Record<string, string>;
  }
) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const headers = { ...options?.headers };
      if (options?.authToken) {
        headers["Authorization"] = `Bearer ${options.authToken}`;
      }
      const fullUrl = `${backendUrl}${url}`
      const response = await fetch(fullUrl, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, deleteData };
};

export default useDelete;
