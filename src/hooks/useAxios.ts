import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { auth } from "../firebase";

export const useAxios = () => {
  // Get request
  const get = useCallback(
    async (uri: string, shouldIncludeBearerToken: boolean = true) => {
      const uid = await auth.currentUser?.getIdToken();
      console.log(auth.currentUser);
      const options: Partial<AxiosResponse> = {};

      if (shouldIncludeBearerToken) {
        options.headers = {
          Authorization: `Bearer ${uid}`,
        };
      }

      return await axios.get(uri, options);
    },
    []
  );

  // Post request
  const post = useCallback(
    async (
      uri: string,
      data: any,
      shouldIncludeBearerToken: boolean = true
    ) => {
      const uid = await auth.currentUser?.getIdToken();

      const options: Partial<AxiosResponse> = {
        data,
      };

      if (shouldIncludeBearerToken) {
        options.headers = {
          Authorization: `Bearer ${uid}`,
        };
      }

      return axios.post(uri, data, options);
    },
    []
  );

  const deleteData = useCallback(
    async (uri: string, shouldIncludeBearerToken: boolean = true) => {
      const uid = await auth.currentUser?.getIdToken();

      const options: Partial<AxiosResponse> = {};

      if (shouldIncludeBearerToken) {
        options.headers = {
          Authorization: `Bearer ${uid}`,
        };
      }

      return axios.delete(uri, options);
    },
    []
  );

  const update = useCallback(
    async (
      uri: string,
      data: Object,
      shouldIncludeBearerToken: boolean = true
    ) => {
      const uid = await auth.currentUser?.getIdToken();

      const options: Partial<AxiosResponse> = {
        data,
      };

      if (shouldIncludeBearerToken) {
        options.headers = {
          Authorization: `Bearer ${uid}`,
        };
      }

      return axios.put(uri, data, options);
    },
    []
  );

  return { get, post, deleteData, update };
};
