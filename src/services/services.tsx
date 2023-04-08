import { ApiResponse } from "../models/ApiResponse";

const API_URL = "http://universities.hipolabs.com";

export const getCountries = async (): Promise<ApiResponse[]> => {
  return fetch(`${API_URL}/search`).then((response) => response.json());
};
export const getUniversitiesByCountry = async (
  country: string
): Promise<ApiResponse[]> => {
  return fetch(`${API_URL}/search?country=${country}`).then((results) => {
    return results.json();
  });
};
