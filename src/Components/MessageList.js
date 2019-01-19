import React, { Component } from 'react';

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: "",
            roomID: "",
            sentAt: Date.now(),
            username: ""
        }
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.createMessage = this.createMessage.bind(this);
    }

    createMessage() {
        this.messagesRef.push({
            sentAt: this.state.sentAt,
            content: this.state.newMessage,
            username: this.props.user.displayName,
            roomID: this.props.activeRoom.key
        });
    }

    handleNewMessage(e) {
        this.setState({
            username: this.props.displayName,
            newMessage: e.target.value,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomID: this.props.activeRoom.roomID
        })
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message )})
        })
    }

    displayName() {
        if(this.props.user) {
            return this.props.user.displayName
        } else {
            return "Guest"
        }
    }

    render() {
        return(
            <div>
                <h1 className="heading-main">Quiet Room</h1>
                <div className="message-box">
                <p className="username">{this.props.activeRoom.name}</p>
                    {
                        this.state.messages.filter( message => this.props.activeRoom.key === message.roomID).map( (messages, index) =>
                            <p key={index+1} className="container">{messages.content}</p>
                    )}
                    <form onSubmit={this.createMessage}>
                        <div className="form-group">
                            <label className="new-message">New Message:
                                <input type="text-box" className="form-control" value={this.state.newMessage} onChange={this.handleNewMessage} />
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary">submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessageList;