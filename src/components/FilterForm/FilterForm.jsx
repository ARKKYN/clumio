import { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { getGenres } from "api/getGenres";
import SelectInput from "components/SelectInput";



function FilterForm({filters, onChange}) {
  const { isError: genreHasError, isLoading: isGenreLoading,  data: genres,  } = useQuery('genres', getGenres);

  const getYears = useMemo(() => {
    const maxYear = new Date().getFullYear() + 11;
    const minYear = 1950;
    const years = new Set();
    for (let i = minYear; i < maxYear; i ++) {
      years.add(i.toString());
    }
    return Array.from(years);
  }, []);

  const getGenresSelectBox = useCallback(() => {
    if (isGenreLoading) {
      return "loading...";
    }

    if (genreHasError) {
      return "Genre Not Available";
    }

    return <SelectInput label="Genere"  onChange={onChange} value={filters.genre} name="genre" data={genres.genres} />;
   },[isGenreLoading, genreHasError, onChange, genres, filters]);

  return (<form>
    <SelectInput label="Type"  onChange={onChange} value={filters.type}  name="type" data={["movies", "tv"]} />
    {getGenresSelectBox()}
    <SelectInput label="From Year"  onChange={onChange} value={filters.year_from}    name="year_from" data={getYears} />
    <SelectInput label="To Year"  onChange={onChange} value={filters.year_to}   name="year_to" data={getYears} />
    <SelectInput label="Rating"  onChange={onChange} value={filters.rating}   name="rating" data={["all",1,2,3,4,5,6,7,8,9,10]} />
 </form>);
}


export default memo(FilterForm);

FilterForm.propTypes = {
  filters : PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
