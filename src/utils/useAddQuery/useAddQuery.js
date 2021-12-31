import { useCallback } from "react";
import { isEmpty } from "utils/strings";

export default function useAddQuery() {
  const location = window.location;
  const addQuery = useCallback(
    (key, value) => {

      const params = new URLSearchParams(location.search);
      if (isEmpty(value)) {
        params.delete(key);
      } else {
      params.set(key, value);
      }

      var url = new URL(window.location.href);
      url.search = params;
      url = url.toString();
      window.history.replaceState({url: url}, null, url);
    },
    [location]
  );

  return { addQuery };
}
