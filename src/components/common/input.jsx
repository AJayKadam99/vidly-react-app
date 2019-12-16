import React from "react";

const Input = ({ name, label, errors, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {errors && (
        <small id={name + "Help"} className="form-text text-muted alert-danger">
          {errors}
        </small>
      )}
    </div>
  );
};

export default Input;
