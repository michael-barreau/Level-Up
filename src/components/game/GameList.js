import React, { useState, useEffect } from "react"
import { getGames } from "./GameManager.js"
import { useHistory } from 'react-router-dom'

export const GameList = (props) => {
    const history = useHistory()
    const [ games, setGames ] = useState([]);

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className= "game_edit_button" onClick={()=>{history.push(`/games/$/(game.id)/edit`)}}>Edit</button>
                    </section>
                })
            }
            
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            history.push({ pathname: "/games/new" })
            }}>Register New Game</button> 
            
        </article> 
    )
}