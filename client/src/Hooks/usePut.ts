import { useState } from "react";
import { backendUrl } from "../constant";

const usePut = <TResponse, TRequest = any>(
  url: string,
  options?: {
    authToken?: string;
    headers?: Record<string, string>;
  }
) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putData = async (bodyData: TRequest | FormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const headers = { ...options?.headers };
      if (!(bodyData instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }
      if (options?.authToken) {
        headers["Authorization"] = `Bearer ${options.authToken}`;
      }
      const fullUrl = `${backendUrl}${url}`
      const response = await fetch(fullUrl, {
        method: "PUT",
        headers,
        body: bodyData instanceof FormData ? bodyData : JSON.stringify(bodyData),
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

  return { data, isLoading, error, putData };
};

export default usePut;
