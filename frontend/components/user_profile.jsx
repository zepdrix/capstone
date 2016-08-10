const React = require('react');
const Link = require('react-router').Link;
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const TrackStore = require('../stores/track_store.js');
const TrackIndex = require('./track_index.jsx');
const CSSHelper = require('../helpers/css.js');

var UserProfile = React.createClass({

  getInitialState () {
    let user = UserStore.find(parseInt(this.props.params.userId));
    let rbg1 = CSSHelper.styleHelper();

    return { user: UserStore.find(parseInt(this.props.params.userId)), userTracks: TrackStore.all(), rbg1: rbg1};
  },

  componentDidMount () {
    this.userListener = UserStore.addListener(this.onUserChange);
    this.trackListener = TrackStore.addListener(this.onTrackChange);
    TrackActions.fetchUserTracks(parseInt(this.props.params.userId));
    UserActions.fetchUser(parseInt(this.props.params.userId));
  },

  onTrackChange () {
    this.setState({ userTracks: TrackStore.all() });
  },

  componentWillUnmount () {
    this.userListener.remove();
    this.trackListener.remove();
  },

  onUserChange () {
    this.setState({ user: UserStore.find(parseInt(this.props.params.userId)) });
  },

  render () {

    let rbg2 = [this.state.rbg1[1], this.state.rbg1[2], this.state.rbg1[0]];
    if (this.state.user) {

      let username = this.state.user.username;
      let userTracks = this.state.userTracks;
      let avatarUrl = this.state.user.avatar_image_url;
      let userUrl = `/users/${this.state.user.id}`;

      return(
        <div className="user-page">
          <div className="user-page banner-area" style={{background: '-webkit-linear-gradient(135deg, rgba('+(this.state.rbg1[0])+', '+(this.state.rbg1[1])+', '+(this.state.rbg1[2])+', 0.5) 1%, rgba('+rbg2[0]+', '+(0)+', '+rbg2[2]+', 0.7) 100%)'}}>
            <div>
              <img className="user-avatar-image" src={ this.state.user.avatar_image_url }/>
            </div>

            <div className="user-info">
              <div className="username">
                <Link to={ `/users/${this.state.user.id}` }>{ this.state.user.username }</Link>
              </div>
              <div className="user-location">


              </div>
            </div>
          </div>

          <div className="user-tracks">

            <h2>{ this.state.user.username }'s Vibrations</h2>
            <br/>
            <TrackIndex tracks={ userTracks }/>
          </div>
        </div>

      );

    } else {
      return(
        <div>
        </div>
      );
    }


  }

});

module.exports = UserProfile;
