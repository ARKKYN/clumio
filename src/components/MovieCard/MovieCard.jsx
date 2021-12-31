import { memo } from "react";
import { generateImageLink } from "utils";
import PropTypes from "prop-types";

const movieCardStyle = {
  width: "200px",
  height: "340px",
};

function MovieCard({ movie }) {
  const year =  (movie.release_date || movie.first_air_date) ?  new Date(movie.release_date || movie.first_air_date).getFullYear() : "";
  return (
    <div
      className="w-1/4 flex flex-col items-center text-center"
      style={movieCardStyle}
    >
      <img
        src={generateImageLink(movie.poster_path)}
        className="mb-1 basis-5/6 shadow"
        style={{ minHeight: "300px" }}
        alt={movie.name}
      />
      <div className="basis-1/6">
        <p className="text-light-blue font-bold">
          {movie.name || movie.title}
        </p>
        <p className="dark:text-gray-400">
          {year}
        </p>
      </div>
    </div>
  );
}

export default memo(MovieCard);

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};
