import { useCallback } from "react";
import { isEmpty } from "utils/strings";


interface IAddQueryInterface {
  key : string,
  value : string,
}

export default function useAddQuery() {
  const location: Location = window.location;
  const addQuery = useCallback(
    (key: IAddQueryInterface["key"], value: IAddQueryInterface["value"]) : void => {
      const params = new URLSearchParams(location.search);
      if (isEmpty(value)) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      var url: string | URL = new URL(window.location.href);
      url.search = params.toString();
      url = url.toString();
      window.history.replaceState({ url: url }, "", url);
    },
    [location]
  );

  return { addQuery };
}
