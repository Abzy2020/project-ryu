import React, { useRef } from 'react';
import io from 'socket.io-client';

const ChatBox = () => {

    const [chat, setChat] = React.useState([])
    const chatDisplay = chat.map(msgs => <p>{msgs}</p>)

    const textRef = useRef();

    //create socket
    const socket = io.connect("http://192.168.1.79:3001");

    const sendMsg = async () => {
        await socket.emit('send_message', { message: textRef.current.value });
        if (chat.length === 0){
            setChat(prevChat => [...prevChat, textRef.current.value]);
        }
    }

    //restart when we get chat data
    React.useState( async () => {
        await socket.on("recieve_message", (data) => {
            setChat(prevChat => [...prevChat, data]);
        })
    }, [socket, chatDisplay])

    return(
        <div className="chat-box">
            <div className="msgs">
            {chatDisplay}
            </div>
            <form className="msg-form">
                <input id="text-field" ref={textRef} type='text' placeholder='send message'/>
                <button id="send-btn" type='button' onClick={sendMsg}>send</button>
            </form>
        </div>
    )
}
export default ChatBox;