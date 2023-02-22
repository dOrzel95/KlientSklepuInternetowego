import React, { Component } from "react";
import Navigate from "./Navigate";
import Hamburger from "./Hamburger";
import "../styles/Header.css";

class Header extends Component {
  state = {
    classHamburger: "hamburger",
    classNav: "navigate"
  };
  hamburgerClick = () => {
    if (this.state.classHamburger === "hamburger") {
      this.setState(prevState => ({
        classHamburger: prevState.classHamburger.concat(" hamburger-active"),
        classNav: prevState.classNav.concat(" navigate-active")
      }));
    } else {
      this.setState({
        classHamburger: "hamburger",
        classNav: "navigate"
      });
    }
  };
  navLinkClick = () => {
    this.setState({
      classHamburger: "hamburger",
      classNav: "navigate"
    });
  };
  render() {
    return (
      <div className="header">
        <div className="logo">
          <h1>BuggyBuilder</h1>
          <div className="logoImg"></div>
        </div>
        <Hamburger
          hamburgerClick={this.hamburgerClick}
          classHamburger={this.state.classHamburger}
        />
        {
          <Navigate
            logIn={this.props.logIn}
            classNav={this.state.classNav}
            navClick={this.navLinkClick}
            addShoppingCart={this.props.addShoppingCart}
            links={this.props.links}
            logout={this.props.logout}

          />
        }

      </div>
    );
  }
}

export default Header;
