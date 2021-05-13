import React from 'react'
import './input.css'

export default function Input({ message, setMessage, sendMessage }) {
    return (
        <form className="form">
            <input value={message} onChange={ e => setMessage(e.target.value) } onKeyPress={e => e.key === 'Enter'?sendMessage(e):null} type="text" placeholder="Type a message..." className="input" />
            <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
        </form>
    )
}
