import React, { Component } from 'react';

class RoomList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: "",
        }
        this.roomsRef =  this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }

    createRoom() {
        this.roomsRef.push({
            name: this.state.newRoomName
        });
    }

    handleChange(e) {
        this.setState({newRoomName: e.target.value});
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    render() {
        return(
            <div className="rooms-list">
                <h2 className="room-heading">Available Rooms</h2>
                <div>
                    {
                        this.state.rooms.map( (room, index) =>
                        <p className="room-num"key={index} onClick={(e) => this.props.roomChanged(room)}>{room.name}</p>
                    )}
                </div>

                <div>
                    <form onSubmit={this.createRoom}>
                        <label className="inp">
                            <span className="label">New Room</span>
                            <input type="text" name="New Room" className="inp-box"value={this.state.newRoomName} onChange={this.handleChange} />
                            <span className="border"></span>
                        </label>
                        <input className="sub" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }

}

export default RoomList;