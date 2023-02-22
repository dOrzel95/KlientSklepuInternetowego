import React from "react";
const Hamburger = props => {
  return (
    <div className={props.classHamburger} onClick={props.hamburgerClick}>
      <div className="element-hamburger"></div>
      <div className="element-hamburger"></div>
      <div className="element-hamburger"></div>
    </div>
  );
};

export default Hamburger;
