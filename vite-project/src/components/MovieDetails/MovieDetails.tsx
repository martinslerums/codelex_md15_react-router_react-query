import { useParams } from "react-router-dom";
import { Movie } from "../../App";
import { useEffect } from "react";
import { MoviePoster } from "../MoviePoster/MoviePoster";

type MovieDetailsProps = {
    getMovieByID: (id: number) => void;
    movie: Movie
  };
  
  const MovieDetails = ({ getMovieByID, movie}: MovieDetailsProps) => {
    const { id } = useParams<{ id: string }>();
    // const [isPending, setIsPending] = useState(true);
    // const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        console.log(id);
    const parsedId = parseInt(id, 10);
      getMovieByID(parsedId);
    }, [getMovieByID, id]);
  
    return (
      <div className="movie-details">
        {/* {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>} */}
        {movie && (
          <>
            <MoviePoster src={movie.moviePoster} alt={movie.movieTitle} />
            <h3>{movie.movieTitle}</h3>
            <span>{movie.movieGenre}</span>
            <span>{movie.movieReleaseYear}</span>
          </>
        )}
      </div>
    );
  };
 
export default MovieDetails;