import { FormEvent } from "react";
import { Movie } from "../Movies/Movies";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import MyForm from "../Form/MyForm";


type InputFormProps = {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMovieAdd: () => void;
  inputForm: Movie
};


export const InputForm = ({ onInputChange, onMovieAdd, inputForm }: InputFormProps) => {

  const handleMovieAdd = (event: FormEvent) => {
      event.preventDefault();
      onMovieAdd();
  }

  return (
      <MyForm 
        onSubmit={handleMovieAdd}
      >
          <Input 
            label="Movie poster:"
            type="text"
            name="moviePoster"
            value={inputForm.moviePoster}
            onChange={onInputChange} 
            required
          />
          <Input 
            label="Movie title:"
            type="text"
            name="movieTitle" 
            value={inputForm.movieTitle}
            onChange={onInputChange} 
            required
          />
          <Input 
            label="Movie genre:"
            type="text" 
            name="movieGenre" 
            value={inputForm.movieGenre}
            onChange={onInputChange}
            required
          />
          <Input 
            label="Movie release year:"
            type="number" 
            name="movieReleaseYear" 
            value={inputForm.movieReleaseYear}
            onChange={onInputChange}
            required
          />
          <Input 
            label="Movie trailer:"
            type="text" 
            name="movieTrailer" 
            value={inputForm.movieTrailer}
            onChange={onInputChange}
            required
          />
          <div>
            <Button 
              type="submit"
              text="Add movie"
            />
          </div>
      </MyForm>
  );
};
