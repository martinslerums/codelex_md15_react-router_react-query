import { useState } from "react";
import { MovieCards } from "../MovieCards/MovieCards";
import { InputForm } from "../InputForm/InputForm";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./Movies.module.css"

const initialFormvalues = {
  id: -1,
  moviePoster: "",
  movieTitle: "",
  movieGenre: "",
  movieReleaseYear: "",
  movieTrailer: "",
};

export type Movie = typeof initialFormvalues;

const Movies = () => {

  const queryClient = useQueryClient();
  const [inputForm, setInputForm] = useState(initialFormvalues);
  const [editedMovie, setEditedMovie] = useState<Movie | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };

  const newMovieMutation = useMutation({
    mutationFn: (movie: Movie) => {
      return axios.post("http://localhost:3001/movie", movie);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["movies"]});
    },
    onError: (error) => {
      console.error("Mutation error on movie add:", error);
    },
  });

  const handleAddMovie = () => {
    //Jāpārveido releaseYear keya value uz ciparu no string
    const movieToAdd = {
      ...inputForm,
      movieReleaseYear: parseInt(inputForm.movieReleaseYear, 10),
    };

    newMovieMutation.mutate(movieToAdd);
    setInputForm(initialFormvalues);
  };

  const deleteMovieMutation = useMutation({
    mutationFn: (movieId: number) => {
      return axios.delete(`http://localhost:3001/movies/${movieId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["movies"]});
    },
    onError: (error) => {
      console.error("Mutation error on movie delete:", error);
    },
  });

  const handleDelete = (movieId: number) => {
    deleteMovieMutation.mutate(movieId);
  };

  const editMovieMutation = useMutation({
    mutationFn: (editedMovie: Movie) => {
      return axios.put(`http://localhost:3001/movies/${editedMovie.id}`, editedMovie)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["movies"]});
    },
    onError: (error) => {
      console.error("Mutation error on movie edit:", error);
    },
  });

  const handleEdit = (editedMovie: Movie) => {
    editMovieMutation.mutate(editedMovie);
  };

  const getMovies = useQuery({
    queryKey: ["movies"],
    queryFn: (obj) => {
      return axios.get("http://localhost:3001/movies").then((response) => {
        // if (!(response.status >= 200 && response.status < 300)) {
        //   throw Error("Could not fetch the data");
        // }
        console.log("getMovies obj:", obj)
        console.log("getMovies inside the useQuery:", response.data);
        return response.data;
      });
    },
  });
  console.log("Outside useQuery:", getMovies.data);

  return (
    <>
      {getMovies.isLoading ? (
        <h1>Loading...</h1>
      ) : getMovies.isError ? (
        <div>Error loading movies: {getMovies.error.message}</div>
      ) : (
        <div className={styles.moviesWrapper}>
          <MovieCards
            moviesArray={getMovies.data.movies}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            editedMovie={editedMovie}
            setEditedMovie={setEditedMovie}
          />
          <InputForm
            onInputChange={handleInputChange}
            onMovieAdd={handleAddMovie}
            inputForm={inputForm}
          />
        </div>
      )}
    </>
  );
};

export default Movies;
