const React = require('react');
const Link = require('react-router').Link;
const UserStore = require('../stores/user_store');
const UserActions = require('../actions/user_actions');
const TimeChange = require('../helpers/time_conversion');

var CommentIndexItem = React.createClass({

  render () {
    let userUrl = `users/${this.props.comment.user_id}`;
    return(
      <li>
        <div>
          <Link className="comment-index-username" to={ userUrl } >{ this.props.comment.username } </Link> says:
          <br/>
          { this.props.comment.body }
        </div>
      </li>
    );
  }

});


module.exports = CommentIndexItem;
