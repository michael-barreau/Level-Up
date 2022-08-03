import React, { useState, useEffect } from "react"
import { getEvents, deleteEvent } from "./EventManager.js"
import { useHistory } from 'react-router-dom'
// import "../LevelUp.css"

export const EventList = (props) => {
    const history = useHistory()

    const [ events, setEvents ] = useState([]);

    useEffect(() => {
        getEvents().then(data => (setEvents(data), console.log(data)))
    }, [])

    const handleDeleteEvent = id => {
        deleteEvent(id)
            .then(() => getEvents().then
                (setEvents))
    };

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div id="test" className="event__name">{event.game.title} by {event.organizer.user.first_name}</div>
                        <div id="test" className="event__description">{event.description}</div>
                        <div id="test" className="event__date">This event is being held {event.date}</div>
                        <div id="test" className="event__time">This event will start at {event.time}</div>
                        <div id="test" className="event__organizer">This event is being organized by {event.organizer.user.first_name}</div>
                    </section>
                })
            }

            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            history.push({ pathname: "/events/new" })
            }}>Register New Event</button> 
            
        </article>
    )
}