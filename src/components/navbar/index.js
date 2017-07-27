import React from 'react';
import { IndexLink } from 'react-router';

export default () => (
  <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
    <div className="container">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="#">Mood Dashboard</a>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <IndexLink
            to="/"
            className="nav-item"
            activeClassName="active"
          >
            Home
          </IndexLink>
        </ul>
      </div>
    </div>
  </nav>
);
