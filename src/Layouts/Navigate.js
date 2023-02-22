import React from "react";
import { NavLink } from "react-router-dom";

const Navigate = props => {
  let menu=""; 
  if(props.logIn ===1||2){
  menu = props.links.map(link => (
    <li key={link.id}>
      <NavLink onClick={()=>{props.navClick()
       if(link.path === "/logout"){
        props.logout();
    }
      }} exact to={link.path}>
        {link.title}
      </NavLink>
    </li>
  ));}
  return (
    <nav className={props.classNav}>
      <ul className="ul-navigate">{menu}</ul>
    </nav>
  );
};

export default Navigate;
