import React from "react";

const Like = props => {
  let heart = "fa fa-heart";
  if (!props.like) heart += "-o";

  return (
    <i style={{ cursor: "pointer" }} className={heart} onClick={props.onLike} />
  );
};

export default Like;
