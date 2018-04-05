import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';
import $ from 'jquery';

// based on Nat's lecture notes
let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
  }
    
  function signup(ev) {
    api.signup(props.login);
  }
  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="name" placeholder="name"
               value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
      <Button onClick={signup}>Sign Up</Button>
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {
  return <div className="navbar-text">
    User id = { props.token.user_id }
  </div>;
});


function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }
  if (props.token) {
  return (
    <nav className="navbar navbar-light bg-light navbar-expand">
      <span className="navbar-brand">
        Tracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/completed" href="#" className="nav-link">Completed Tasks</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/mine" href="#" className="nav-link">My Tasks</NavLink>
        </NavItem>
      </ul>
      { session_info }
    </nav>
  );
  } else {
  return (
    <nav className="navbar navbar-light bg-light navbar-expand">
      <span className="navbar-brand">
        Tracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/completed" href="#" className="nav-link">Completed Tasks</NavLink>
        </NavItem>
      </ul>
      { session_info }
    </nav>
  );
  }
} 

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
