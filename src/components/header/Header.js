import React, { Component } from 'react';

import './header.css';

class Header extends Component {
  render() {
    return (
      <header className="header display--flex">
        <div className="header__logo"></div>
        <h1 className="header__title">No Borders ~ Memory Makers</h1>
      </header>
    );
  }
}

export default Header;
