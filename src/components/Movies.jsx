import React, { Component } from "react";
import MoviesTable from "./MoviesTables";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate.js";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: 0,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genres,
      searchedMovies: getMovies()
    });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: ""
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: AllMovies,
      searchQuery,
      selectedGenre
    } = this.state;
    let filtered = AllMovies;
    if (searchQuery)
      filtered = AllMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = AllMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: len } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: movies } = this.getPagedData();
    if (len === 0)
      return (
        <React.Fragment>
          <h3>There are no movies in the database.</h3>
        </React.Fragment>
      );
    return (
      <div className="row">
        <div className="col-1" />
        <div className="col-3 m-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary my-3" to="/movies/new">
            New Movie
          </Link>
          <h4>Showing {totalCount} movies in database.</h4>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
