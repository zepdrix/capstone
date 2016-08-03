const SessionApiUtil = require('../util/session_api_util.js');
const SessionConstants = require('../constants/session_constants.js');
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ErrorActions = require('./error_actions.js');

module.exports = {

  createUser (user) {
    SessionApiUtil.createUser(
      user,
      this.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  loginUser (user) {
    SessionApiUtil.loginUser(
      user,
      this.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  logoutUser () {
    SessionApiUtil.logoutUser(
      this.removeCurrentUser);
  },

  fetchCurrentUser (complete) {
    SessionApiUtil.fetchCurrentUser(
      SessionActions.receiveCurrentUser, complete);
  },

  receiveCurrentUser (user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      user: user
    });
  },

  removeCurrentUser (user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT,
      user: user
    });
  }
};
