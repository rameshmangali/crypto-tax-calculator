import React from "react";

const Container = ({ children, className }) => {
  return <div className={`${className} px-4 md:px-[80px]`}>{children}</div>;
};

export default Container;