import { useState } from "react";
import { InputForm } from "./components/InputForm/InputForm";
import { MovieCards } from "./components/MovieCards/MovieCards";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const initialFormvalues = {
  id: 0,
  moviePoster: "",
  movieTitle: "",
  movieGenre: "",
  movieReleaseYear: "",
  movieTrailer: "",
};

export type Movie = typeof initialFormvalues;

const App = () => {
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [movie, setMovie] = useState<Movie>(initialFormvalues);
  const [inputForm, setInputForm] = useState(initialFormvalues);
  const [editMode, setEditMode] = useState<Movie | null>(null);
  // const { id } = useParams();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleMovieAdd = () => {
    const movieToAdd = {
      ...inputForm,
      movieReleaseYear: parseInt(inputForm.movieReleaseYear, 10),
    };
    console.log(movieToAdd);
    axios.post("http://localhost:3001/movie", movieToAdd).then(() => {
      

      setInputForm(initialFormvalues);
    });
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:3001/movies/${id}`).then(() => {
      
      
    });
  };

  const handleEdit = (id: number, editedMovie: Movie) => {
    axios.put(`http://localhost:3001/movies/${id}`, editedMovie).then(() => {
      
      setEditMode(null);
    });
  };

  const getMovies = useQuery({
    queryKey: ["movies"],
    queryFn: () => {
      return axios.get("http://localhost:3001/movies")
        .then((response) => {
          if (!(response.status >= 200 && response.status < 300)) {
            throw Error("Could not fetch the data");
          }
          console.log("getMovies:", response.data)
          return response.data;
      });
    },
  });


  // if (getMovies.isLoading) return <h1>Loading...</h1>;
  // if (getMovies.isError) {
  //   return <pre>{JSON.stringify(getMovies.error)}</pre>;
  // }

  // const getMovieByID = useQuery({
  //   queryKey: ["movies", id],
  //   queryFn: () =>
  //     axios.get(`http://localhost:3001/movies/${id}`).then((response) => {
  //       if (!(response.status >= 200 && response.status < 300)) {
  //         throw Error("Could not fetch the data");
  //       }
  //       return response.data.movie;
  //       console.log("Get Movie by ID:", response.data.movie)
  //     }),
  // });

  // if (getMovies.isLoading || getMovieByID.isLoading) return <h1>Loading...</h1>;

  return (
    <Router>
      <div>
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/movies">
              <MovieCards
                moviesArray={getMovies.data}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                editedMovie={editMode}
                setEditMode={setEditMode}
              />
              <InputForm
                onInputChange={handleInputChange}
                onMovieAdd={handleMovieAdd}
                inputForm={inputForm}
              />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/movies/:id">
              {/* <MovieDetails movie={movie} getMovieByID={getMovieByID} /> */}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
