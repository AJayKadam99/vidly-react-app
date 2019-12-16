import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "./../services/fakeMovieService";

class Movie extends Form {
  state = {
    data: {
      _id: "new",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const m = getMovie(movieId);
    if (!m) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(m) });
    console.log(this.state.data);
  }
  mapToViewModel(m) {
    console.log(m.genre);
    return {
      _id: m._id,
      title: m.title,
      genre: m.genre,
      numberInStock: m.numberInStock,
      dailyRentalRate: m.dailyRentalRate
    };
  }
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate"),
    genre: Joi.object({
      _id: Joi.string().label("Id"),
      name: Joi.string().label("Genre Name")
    })
  };

  doSubmit = () => {
    //call the server
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  render() {
    const { match } = this.props;

    return (
      <div className="mx-5">
        <h1>Movie form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default Movie;
