import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  render() {
    const columns = [
      {
        path: "title",
        name: "Title",
        content: movie => (
          <NavLink to={`/movies/${movie._id}`}>{movie.title}</NavLink>
        )
      },
      { path: "genre.name", name: "Genre" },
      { path: "numberInStock", name: "Stock" },
      { path: "dailyRentalRate", name: "Rate" },
      {
        key: "like",
        content: movie => (
          <Like like={movie.like} onLike={() => this.props.onLike(movie)} />
        )
      },
      {
        key: "delete",
        content: movie => (
          <button
            className="btn btn-danger btn-sm"
            id="delete"
            onClick={() => this.props.onDelete(movie)}
          >
            Delete
          </button>
        )
      }
    ];
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={columns}
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
