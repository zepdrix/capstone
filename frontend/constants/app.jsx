const React = require('react');
const LoginForm = require('./login_form.jsx');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const Link = require('react-router').Link;

const NavBar = require('./nav_bar.jsx');
const PlayBar = require('./play_bar.jsx');
const HomePage = require('./home_page.jsx');
const UserPage = require('./user_page.jsx');

var App = React.createClass({
  getInitialState () {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this.updateUser);
    SessionActions.fetchCurrentUser();
  },

  updateUser () {
    this.setState({ currentUser: SessionStore.currentUser() });
  },

  render () {

    return(
      <div className="app-div">
        <NavBar />
        { this.props.children }
        <PlayBar />
      </div>
    );
  }

});

module.exports = App;