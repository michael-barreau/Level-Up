import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent, getEvents } from './EventManager.js'
import { getGames } from '../game/GameManager.js'


export const EventForm = () => {
    const history = useHistory()
    const [events, setEvents] = useState([])
    const [games, setGames] = useState([])


    const [currentEvent, setEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: "",
        organizerId: 0
    })

    useEffect(() => {
        getEvents().then((events) => {
            (console.log(events),setEvents(events))
        })
    }, []);

    useEffect(() => {
        getGames().then((games) => {
            (console.log(games),setGames(games))
        })
    }, []);

    // useEffect(() => {
    //     getGames()
    // }, [])


    const changeEventState = (domEvent) => {
        const newEvent = { ...currentEvent}
        let selectedVal = domEvent.target.value
        if (domEvent.target.id.includes("Id")) {
          selectedVal = parseInt(selectedVal)
        }
        newEvent[domEvent.target.name] = domEvent.target.value
        setEvent(newEvent)
      }

    // const handleSubmit = e =>{

    //     // e.preventDefault()
    //     // const event = {
    //     //     gameId: parseInt(currentEvent.gameId),
    //     //     description: currentEvent.description,
    //     //     date: parseInt(currentEvent.date),
    //     //     time: parseInt(currentEvent.time),
    //     //     organizer: parseInt(currentGame.organizerId)
    //     // }

    // createEvent(event)
    //     .then(()=> history.push("/events"))
    // }
    


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="gameId" id="gameId" required autoFocus className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}>
                    {
                         games.map(g => (<option key={g.id} value={g.id}>{g.title}</option>))
                    }
                    </select> 
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}/>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}/>
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}/>
                </div>
                <div className="form-group">
                     <label htmlFor="event">Event: </label>
                     <select value={currentEvent.organizerId} name="organizerId" id="organizerId" onChange={changeEventState} className="form-control">
                     <option value="0">Select an Organizer: </option>
                        {events.map(e => (
                    <option key={e.id} value={e.organizer.id}>
                        {e.organizer.user.first_name}
                    </option>
                 ))}
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        gameId: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: (currentEvent.date),
                        time: (currentEvent.time),
                        organizer: parseInt(currentEvent.organizerId)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}