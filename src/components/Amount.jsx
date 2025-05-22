import React from "react";
import { format } from "../helper/helper";

const Amount = ({ children, className }) => {
  return (
    <p className={`${className} ${children < 0 && "text-red-500"}`}>
      {format(children)}
    </p>
  );
};

export default Amount;
