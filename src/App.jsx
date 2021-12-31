import { useCallback, useEffect, useMemo, useState } from "react";
import "App.scss";
import { getMovies } from "api";
import { useQuery } from "react-query";

import { useAddQuery } from "utils";
import { useDebounce, useLocation } from "react-use";
import { isEmpty } from "utils/strings";
import { Header, MovieCard, FilterForm } from "components";

function App() {
  const [filters, setFilters] = useState({
    type: "movies",
    genre: "",
    sortBy: "popularity.desc",
    year_from: 1950,
    year_to: 2031,
    rating: "all",
    search: "", // Seach is mocked using discover Api. Since filters not available on search.
  });

  const { isError, isLoading, data } = useQuery(["movies", filters], getMovies);
  const [search, setSearch] = useState("");
  const { addQuery } = useAddQuery();
  const location = useLocation();

  useDebounce(
    function debounce() {
      addQuery("search", search);
    },
    400,
    [search]
  );

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  const onFiltersChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      switch (name) {
        case "type":
        case "genre":
        case "rating":
        case "sortBy":
          addQuery(name, value);
          break;
        case "year_from":
          if (Number(value) > Number(filters["year_to"])) {
            alert("Please Choose a valid date Range");
            return;
          }
          addQuery(name, value);
          break;
        case "year_to":
          if (Number(value) < Number(filters["year_from"])) {
            alert("Please Choose a valid Date Range");
            return;
          }
          addQuery(name, value);
          break;
        case "search":
          if (!isEmpty(value)) {
            addQuery(name, value);
          }
          break;
        default:
          break;
      }
    },
    [addQuery, filters]
  );

  useEffect(
    function updateFiltersOnQueryChange() {
      const params = new URLSearchParams(location.search);
      const temp = {};
      params.forEach((value, key) => {
        if (key === "search" && isEmpty(value)) {
          return;
        }
        temp[key] = value;
      });

      setFilters({ ...filters, ...temp });
    },
    [location.search]
  );

  const onNavButtonClick = useCallback(
    (e) => {
      addQuery("sortBy", e.target.name);
    },
    [addQuery]
  );

  const listMovies = useMemo(() => {
    if (isLoading) {
      return <p className="text-center text-white">Loading..</p>;
    }

    return data.results.map((x) => {
      return <MovieCard key={x.id} movie={x} />;
    });
  }, [data, isLoading]);

  if (isError) {
    return (
      <p className="block self-center">
        Something Went Wrong Please try Again Later
      </p>
    );
  }

  return (
    <div className="App flex">
      <div className="h-full w-5/6 flex min-h-screen flex-col overflow-y-scroll dark:bg-night">
        <Header
          filter={filters.sortBy}
          search={search}
          onNavButtonClick={onNavButtonClick}
          onSearchChange={onSearchChange}
        />
        <article className="flex min-h-screen flex-row flex-wrap gap-x-8 gap-y-14 mx-auto w-5/6  h-5/6">
          {listMovies}
        </article>
      </div>
      <div className="w-1/6 dark:bg-midnight min-h-screen shadow flex flex-col ">
        <div className="w-10/12 mx-auto">
          <h2 className="font-bold py-14 text-blue-700 dark:text-gray-400">
            Discover Options
          </h2>
          <FilterForm filters={filters} onChange={onFiltersChange} />
          <button
          onClick={toggleDarkMode}
          className="bg-transparent hover:bg-light-blue text-light-blue font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
