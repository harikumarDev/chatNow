import React from 'react'
import './textContainer.css'
import onlineIcon from '../../Icons/onlineIcon.png'

export default function TextContainer({ users }) {
    return (
        <div className="textContainer">
            <div>
                <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
                <h2>Try it out! <span role="img" aria-label="emoji"></span></h2>
            </div>
            {users?(<div>
                <h1>People online:</h1>
                <div className="activeContainer">
                <h2>
                    {users.map(({name}) => (
                        <div key={name} className="activeItem">
                            {name}
                            <img alt="Online Icon" src={onlineIcon}/>
                        </div>
                    ))}
                </h2>
                </div>
            </div>): null}
        </div>
    )
}
