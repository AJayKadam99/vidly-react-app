import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    console.log(errors);
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSelect = ({ currentTarget: selected }) => {
    console.log(selected.value);
    const data = { ...this.state.data };
    data.genreId = selected.value;
    this.setState({ data });
  };

  renderButton = label => {
    return (
      <button
        disabled={this.validate()}
        // onClick={() => this.props.history.push("/" + location)}
        className="btn btn-primary my-2"
      >
        {label}
      </button>
    );
  };
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };
  renderSelect = (name, label, data) => {
    const { errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        data={data}
        onChange={this.handleSelect}
        errors={errors[name]}
      />
    );
  };
}

export default Form;
