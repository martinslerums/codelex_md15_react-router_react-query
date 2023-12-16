// import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../Movies/Movies";
import { Button } from "../Button/Button";
import { MoviePoster } from "../MoviePoster/MoviePoster";
import { Input } from "../Input/Input";
import MyForm from "../Form/MyForm";
import styles from "./MovieCards.module.css";

type MovieCardsProps = {
  moviesArray: Movie [];
  handleDelete: (id: number) => void;
  handleEdit: (movie: Movie) => void;
  editedMovie: Movie | null;
  setEditedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
};

export const MovieCards = ({moviesArray, handleDelete, handleEdit, editedMovie, setEditedMovie}: MovieCardsProps) => {
  console.log("moviesArray no MovieCards comp:", moviesArray)

  // const {id, moviePoster, movieTitle, movieGenre, movieReleaseYear, movieTrailer} = editedMovie || {};
  
  const startEditMode = (movie: Movie) => {
    setEditedMovie({
      id: movie.id,
      moviePoster: movie.moviePoster,
      movieTitle: movie.movieTitle,
      movieGenre: movie.movieGenre,
      movieReleaseYear: movie.movieReleaseYear,
      movieTrailer: movie.movieTrailer,
    });
  };

  const cancelEditMode = () => {
    setEditedMovie(null);
  };

  const saveEditMode = () => {
    

    if (editedMovie) {
      handleEdit(editedMovie);
      setEditedMovie(null);
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveEditMode();
  }

  // const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEditedMovie(() => ({
  //     ...editedMovie,
  //     [e.target.name]: e.target.value,
  //   }));
  // } 

  return (
    <div className={styles.movieCardsWrapper}>
      {moviesArray.map((movie: Movie) => (
          <div className={styles.moviePreview} key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <div className={styles.moviePoster}>
                <MoviePoster src={movie.moviePoster} alt={movie.movieTitle} />
              </div>
              <h3>{movie.movieTitle}</h3>
              <div className={styles.movieDetails}>
                <span className={styles.span}>{movie.movieGenre}</span>
                <span>{movie.movieReleaseYear}</span>
              </div>
            </Link>
            <div className={styles.trailerWrapper}>
              <Button 
                href={movie.movieTrailer}
                text="Watch trailer"
              />
            </div>
            <div className={styles.actionsWrapper}>
              <Button text="Delete" onClick={() => {handleDelete(movie.id)}}/>
              <Button text="Edit" onClick={() => {startEditMode(movie)}}/>
            </div>
          </div>
      ))}
      {editedMovie && (
          <MyForm
            onSubmit={onFormSubmit}
          >
            <h1>EDIT MOVIE</h1>
            <Input 
              type="text"
              value={editedMovie.moviePoster}
              name="moviePoster"
              onChange={(e) =>
                setEditedMovie({
                  ...editedMovie,
                  moviePoster: e.target.value,
                })
              }
            />
            <Input 
              type="text"
              value={editedMovie.movieTitle}
              name="movieTitle"
              onChange={(e) =>
                setEditedMovie({
                  ...editedMovie,
                  movieTitle: e.target.value,
                })
              }
            />
            <Input 
              type="text"
              value={editedMovie.movieGenre}
              name="movieGenre"
              onChange={(e) =>
                setEditedMovie({
                  ...editedMovie,
                  movieGenre: e.target.value,
                })
              }
            />
            <Input 
              type="number"
              value={editedMovie.movieReleaseYear}
              name="movieReleaseYear"
              onChange={(e) =>
                setEditedMovie({
                  ...editedMovie,
                  movieReleaseYear: e.target.value,
                })
              }
            />
            <Input 
              type="text"
              value={editedMovie.movieTrailer}
              name="movieTrailer"
              onChange={(e) =>
                setEditedMovie({
                  ...editedMovie,
                  movieTrailer: e.target.value,
                })
              }
            />
            <div>
              <Button type="button" text="Cancel" onClick={cancelEditMode} />
              <Button type="submit" text="Save"/>
            </div>
          </MyForm>
      )}
    </div>
  );
};
