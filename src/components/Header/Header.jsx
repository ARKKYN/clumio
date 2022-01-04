import { memo } from "react";
import PropTypes from "prop-types";
import SearchInput from "components/SearchInput";


function Header({ search, onNavButtonClick, onSearchChange, filter }) {
  const getClass = (text) => {
    if (text.indexOf(filter) > -1){
      return "text-black dark:text-white";
    }
    return "text-light-blue";
  }

  return (
    <header className="flex py-14 flex-row justify-center flex-wrap gap-2 mx-auto mb-6 w-5/6 overflow-y-scroll h-1/6">
      <div className="flex-0">
        <h1 className="dark:text-gray-100  font-bold font-serif text-3xl">
          Discover
        </h1>
      </div>
      <div className="flex-1">
        <ul className="nav mx-auto mt-2 w-max list-none justify-around ">
          <li>
            <button
              onClick={onNavButtonClick}
              name="popularity.desc"
              className={getClass("popularity.desc")}
            >
              Popular
            </button>
          </li>
          <li>
            <button
              onClick={onNavButtonClick}
              name="primary_release_date.desc"
              className={getClass("primary_release_date.desc")}
            >
              Newest
            </button>
          </li>
          <li>
            <button
              onClick={onNavButtonClick}
              name="vote_average.desc"
              className={getClass("vote_average.desc")}
            >
              Top Rated
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-0">
        <SearchInput value={search} onChange={onSearchChange} />
      </div>
    </header>
  );
}

export default memo(Header);

Header.propTypes = {
  search: PropTypes.string.isRequired,
  onNavButtonClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
