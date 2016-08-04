const TrackApiUtil = require('../util/track_api_util.js'),
      TrackConstants = require('../constants/track_constants.js'),
      AppDispatcher = require('../dispatcher/dispatcher.js'),
      ErrorActions = require('./error_actions.js');

module.exports = {
  createTrack (track) {
    TrackApiUtil.createTrack(
      track,
      this.receiveTrack,
      ErrorActions.setErrors);
  },

  fetchAllTracks () {
    TrackApiUtil.fetchAllTracks(
      this.receiveTracks);
  },

  receiveTrack (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.RECEIVE_TRACK,
      track: track
    });
  },

  receiveTracks (tracks) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.RECEIVE_TRACKS,
      tracks: tracks
    });
  },

};