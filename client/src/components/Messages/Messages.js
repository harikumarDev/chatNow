import React from 'react'
import './messages.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'

export default function Messages({ messages, name }) {
    return (
        <ScrollToBottom className="messages">
            {messages.map((msg,ind) => <div key={ind}> <Message message={msg} name={name}/> </div> )}
        </ScrollToBottom>
    )
}
