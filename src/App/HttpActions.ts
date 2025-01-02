import axios, { AxiosResponse } from "axios";
import { RequestResponse } from "../Types/RequestResponse";
import userStore from "./Store/user.ts";

// Define the props interface for the request
interface Prop {
  type: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  token?: string;
}

// Overloads for the GenerateRequest function
export function GenerateRequest<T>({
  type,
  url,
  token,
}: Prop): () => Promise<RequestResponse<T>>;
export function GenerateRequest<T, D>({
  type,
  url,
  token,
}: Prop): (data: D) => Promise<RequestResponse<T>>;

// Implementation of the function
export function GenerateRequest<T, D>({ type, url }: Prop) {
  let axiosType: (data: D) => Promise<AxiosResponse<T>>;
  switch (type) {
    case "get":
      axiosType = () => axios.get<T>(url, { withCredentials: true });
      break;

    case "post":
      axiosType = (data: D) => {
        return axios.post<T>(url, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
      };
      break;

    case "put":
      throw new Error("Not Implemented");

    case "delete":
      throw new Error("Not Implemented");

    case "patch":
      throw new Error("Not Implemented");

    default:
      throw new Error("Invalid request type");
  }

  // Return the async function based on the axiosType
  return async (data: D): Promise<RequestResponse<T>> => {
    const response = new RequestResponse<T>();
    try {
      const axiosResponse = await axiosType(data); // Call the axios method
      return response.Ok(axiosResponse.data);
    } catch (error) {
      console.log("response", error);
      if (axios.isAxiosError(error) && error.response) {
        // Check if the error is a 401 response

        if (error.response.status === 401) {
          console.error(
            "Unauthorized access - perhaps the token is invalid or expired.",
          );
          // Handle the 401 response (e.g., redirect to login, show an error message)
        } else {
          console.error(
            "An error occurred:",
            error.response.status,
            error.response.data,
          );
        }
        return response.Error(
          `${error.response.status}: ${error.message}`,
          error,
        );
      }

      console.error("Error occurred while making the request:", error);
      return response.Error("Error occurred while making the request");
    }
  };
}

export function GetRequest<T, D>(url: string) {
  const accessToken = userStore((store) => store.user.accessToken);

  return async (params: D) => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : "";

    return axios
      .get<T>(url + queryString, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((r) => {
        return new RequestResponse<T>().Ok(r.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          return new RequestResponse<T>().Error(
            `${error?.response?.data ?? error.message}`,
            error,
          );
        }
        return new RequestResponse<T>().Error("Unexpected Error");
      });
  };
}

export function PostRequest<T, D>(url: string) {
  return async (data: D) =>
    axios
      .post<T>(url, data)
      .then((response) => {
        return new RequestResponse<T>().Ok(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          return new RequestResponse<T>().Error(
            `${error?.response?.data ?? error.message}`,
            error,
          );
        }
        return new RequestResponse<T>().Error("Unexpected Error");
      });
}
