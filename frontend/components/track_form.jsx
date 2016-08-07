const React = require('react');
const TrackActions = require('../actions/track_actions.js');
const TrackStore = require('../stores/track_store.js');
const ErrorStore = require('../stores/error_store.js');
const FormConstants = require('../constants/form_constants.js');

var TrackForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },


  getInitialState () {
    return {
      title: '',
      description: '',
      imageFile: null,
      imageUrl: null,
      audioFile: '',
      audioUrl: null };
  },

  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.trackListener = TrackStore.addListener(this.redirectIfTrackSaved);
  },

  componentWillUnmount () {
    this.errorListener.remove();
    this.trackListener.remove();
  },

  redirectIfTrackSaved() {
    console.log(TrackStore.all());
    TrackActions.fetchAllTracks();
    this.context.router.push("/");
  },

  handleTitle (e) {
    this.setState({ title: e.target.value });
  },

  handleDescription (e) {
    this.setState({ description: e.target.value });
  },

  handleImage (e) {
    let file = e.currentTarget.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }

  },

  handleAudio (e) {
    let file = e.currentTarget.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = function () {
      this.setState({ audioFile: file, audioUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  },


  handleSubmit (e) {
    e.preventDefault();
    let formData = new FormData();

    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);
    formData.append("track[audio]", this.state.audioFile);

    if (this.state.imageFile) {
      formData.append("track[image]", this.state.imageFile);
    }

    TrackActions.createTrack(formData);
  },

  formErrors () {
    let errors = ErrorStore.errors(FormConstants.CREATE_TRACK_FORM) || [];
    if (errors.length > 0) {
      let errorMessages = errors.map( (error, key) => {
        return <li className="form-error" key={ key }>{ error }</li>;
        });

        return <ul>{ errorMessages }</ul>;
    }
  },

  render () {
    return(
      <div>
        <form className="create-track-form" encType="multipart/form-data" onSubmit={ this.handleSubmit }>
          <div className="create-track-form-title">Upload a Track</div>
          { this.formErrors() }
          <div className="login-input">
            <input className="input"
              placeholder="Track Title"
              value={ this.state.title }
                onChange={ this.handleTitle }/>
          </div>
          <br/>
          <div className="login-input">
            <textarea className="input"

              placeholder="Track Description"
              value={ this.state.description }
              onChange={ this.handleDescription }/>
          </div>

          <div className="login-input">
            Upload a track image!
            <input type="file" onChange={ this.handleImage }/>
            <br/>
            <img src={ this.state.imageUrl }/>
          </div>

          <div className="login-input">
            Upload a song!
            <input type="file" onChange={ this.handleAudio }/>
            <br/>
            <audio src={ this.state.audioUrl } preload="auto" controls>
            </audio>
          </div>

          <button className="create-track-button form-hover">Submit</button>
        </form>
      </div>
    );
  }
});


module.exports = TrackForm;
