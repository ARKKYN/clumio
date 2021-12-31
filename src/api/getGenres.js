import axios from "axios";
import {API_KEY, API_URL} from "config";

export async function getGenres() {
  const {data} = await axios.get(`${API_URL}/genre/movie/list`,
  {
    params : {
      "api_key" : API_KEY,
    }
  });

  return data;
}
