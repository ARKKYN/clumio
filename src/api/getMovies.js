import axios from "axios";
import {API_KEY, API_URL} from "config";
import { isEmpty } from "utils/strings";

export async function getMovies({queryKey}) {
  const filters = queryKey[1];
  const path = filters.type === "tv" ? filters.type : "movie";
  var t = {};

  Object.entries(filters).forEach(e => {
    if(isEmpty(e[1])) {
      return;
    }
    switch(e[0]) {
      case "genre":
        t["with_genres"] = e[1];
        break
      case "sortBy":
        t["sort_by"] = e[1];
        break;
      case "year_from":
        t["primary_release_date.gte"] = new Date("01-01-" + e[1]);
        break;
      case "year_to":
          t["primary_release_date.lte"] = new Date("12-12-" + e[1]);
        break;
      case "search":
          t["with_keywords"] = e[1].split(" ").join(",");
          break;

      case "rating":
          if (e[1] != "all") {
          t["vote_average.lte"] = e[1];
          }
          break;
      default:
          break;
    }
  });

  const {data} = await axios.get(`${API_URL}/discover/${path}`, {
    params : {
      "api_key" : API_KEY,
      "page" : 1,
      ...t
    }
  });

  return data;
}
