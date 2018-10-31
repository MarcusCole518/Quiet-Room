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
            roomID: this.state.roomID
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
                {
                    this.state.messages.filter( message => this.props.activeRoom.roomID === message.roomID).map( (messages, index) =>
                    <div>
                        <p>{this.displayName()}</p>
                        <p key={index}>{messages.content}</p>
                    </div>
                    )}
                <form onSubmit={this.createMessage}>
                    <label>New Message:
                        <input type="text-box" className="message" value={this.state.newMessage} onChange={this.handleNewMessage} />
                    </label>
                    <input type="submit" value="submit" />
                </form>

            </div>
        )
    }
}

export default MessageList;