// Higher Order Component (HOC) - A component (HOC) that renders another component.
// It's objectif is to reuse code.
// Render hijacking.
// Prop manipulation.
// Abstract state.

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

// This function will return the HOC component function.
// It receives the regular component as a parameter and returns the HOC component wrapping the regular
// component surrounded by additional JSX.
const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please do not share</p>}
      <WrappedComponent {...props}/>
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? <WrappedComponent {...props} /> : 'Authentication required.' }
    </div>
  );
};

// requireAuthentication:
//  true: show component
//  false: show message instead
// const AdminInfo = withAdminWarning(Info);
const AuthInfo  = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info='these are the details' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info='these are the details' />, document.getElementById('app'));
