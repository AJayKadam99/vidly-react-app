import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, label, data, error } = this.props;

    return (
      <div className="form-group">
        <label htmlFor="genre">{label}</label>
        <select
          name={name}
          id={name}
          className="form-control"
          onChange={this.props.onChange}
        >
          <option value="" />
          {data.map(genre => (
            <option
              key={genre._id}
              value={genre._id}
              name={genre.name}
              //  onSelect={this.handleOptionSelect}
            >
              {genre.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;
