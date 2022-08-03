import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const {gameId}= useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    // useEffect(() => {
    //     getGameTypes().then(setGameTypes)
    // }, [])

    useEffect(() => {
        getGameTypes().then((gameTypes) => {
            setGameTypes(gameTypes);
            console.log(gameTypes)
        })
    }, []);


    const changeGameState = (event) => {
		const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
		setCurrentGame(newGameState)
	}

    const handleSubmit = e =>{

        e.preventDefault()
        const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: (currentGame.numberOfPlayers),
            skill_level: (currentGame.skillLevel),
            game_type: parseInt(currentGame.gameTypeId)
        }

    createGame(game)
        .then(()=> history.push("/games"))
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" min="2" max="4" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" min="1" max= "7" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" required autoFocus className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}
                    >
                    {
                         gameTypes.map(gT => <option key={gT.id} value={gT.id}>{gT.label}</option>)
                    }
                    </select>    
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}