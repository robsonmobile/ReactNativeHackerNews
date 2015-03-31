var moment = require('moment')
var React = require('react-native')
var {
  TouchableHighlight,
  StyleSheet,
  Image,
} = React

var View = require('./View')
var Text = require('./Text')
var HTML = require('./HTML')

var Comment = React.createClass({
  getInitialState() {
    return {
      open: true,
    }
  },
  handleDisclosureClick(e) {
    this.setState({open: !this.state.open})
  },
  renderBody(comment) {
    return (
      <View>
        <HTML value={comment.text} />
        {comment.childItems ? <CommentList comments={comment.childItems} /> : null}
      </View>
    )
  },
  render() {
    var {comment} = this.props
    var {open} = this.state

    if (comment == null) return null

    return (
      <TouchableHighlight onPress={this.handleDisclosureClick} underlayColor="white">
        <View style={styles.comment}>
          <View style={[styles.disclosureRow, styles.inline]}>
            <Image
              source={open ? require('image!disclosure90') : require('image!disclosure')}
              style={[styles.disclosure, styles.muted]}
            />
            <Text style={styles.muted}>
              {' '}
              {moment(comment.time*1000).fromNow()} by {comment.by}
            </Text>
          </View>
          {open ? this.renderBody(comment) : null}
        </View>
      </TouchableHighlight>
    )
  }
})

var CommentList = React.createClass({
  renderComment(comment) {
    return <Comment key={comment.id} comment={comment} />
  },
  render() {
    return (
      <View>
        {this.props.comments.map(this.renderComment)}
      </View>
    )
  }
})

var styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
  },
  muted: {
    opacity: 0.3,
  },
  textMuted: {
    color: '#BBBBBB'
  },
  comment: {
    margin: 4,
    padding: 4,
  },
  disclosure: {
    width: 16,
    height: 16,
  },
  disclosureRow: {
    paddingTop: 4,
    paddingBottom: 4,
  },
})

module.exports = Comment
