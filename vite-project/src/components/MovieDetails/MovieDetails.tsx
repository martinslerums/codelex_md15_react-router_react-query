import { useParams } from "react-router-dom";
import { MoviePoster } from "../MoviePoster/MoviePoster";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

  
const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();

  const getMovieByID = useQuery({
    queryKey: ["movies", id],
    queryFn: () => {
      return axios.get(`http://localhost:3001/movies/${id}`)
        .then((response) => {
          return response.data;
        });
    },
  });

  if (getMovieByID.isLoading) {
    return <div>Loading...</div>;
  }
  
  if (getMovieByID.isError) {
    return <div>Error loading movie details</div>;
  }

  const movie = getMovieByID.data.movie[0]
  
  return (
    <div className="movie-details">
      <>
        <MoviePoster src={movie.moviePoster} alt={movie.movieTitle} />
        <h3>{movie.movieTitle}</h3>
        <span>{movie.movieGenre}</span>
        <span>{movie.movieReleaseYear}</span>
      </>
    </div>
  );
};

export default MovieDetails;