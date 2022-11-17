import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
const { Schools } = require("../../../../DB/Schools"); //分割代入
const { Venues } = require("../../../../DB/Venues"); //分割代入


//データベースとのやりとり
const loadGame = (setGameInfoState) => {

    fetch("http://localhost:5000/game/game_call", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: 1 }),
    })
        .then((response) => response.json())
        .then((data) => handleSentGame(data, setGameInfoState))
}
const handleSentGame = (data, setGameInfoState) => {
    console.log(data)
    setGameInfoState(data)
}


const resisterGame = () => {
    fetch("http://localhost:5000/game/game_register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournament_id: 1 }),
    })
        .then((response) => response.json())
        .then((data) => handleSentGame(data))
}


export const Sokuho_Input_Makegame = (useSchools, setUseSchools) => {
    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    const ining = 1;

    const iningRef = useRef(null)
    const teamARef = useRef(null)
    const teamBRef = useRef(null)
    const venueRef = useRef(null)

    const [iningState, setIningState] = useState(ining)
    const [teamAState, setTeamAState] = useState(1)
    const [teamBState, setTeamBState] = useState(1)
    const [venueState, setVenueState] = useState(1)
    const [gameInfoState, setGameInfoState] = useState([])

    const initialSetIning = () => {
        for (let i = 1; i <= 4; i++) {
            const option = document.createElement('option')
            option.value = i
            option.text = i
            iningRef.current.appendChild(option)
        }
    }

    const initialSetTeamA = () => {
        for (let i = 1; i <= Schools.length; i++) {
            const option = document.createElement('option')
            option.value = Schools[i - 1].school
            option.text = Schools[i - 1].school
            teamARef.current.appendChild(option)
        }
    }

    const initialSetTeamB = () => {
        for (let i = 1; i <= Schools.length; i++) {
            const option = document.createElement('option')
            option.value = Schools[i - 1].school
            option.text = Schools[i - 1].school
            teamBRef.current.appendChild(option)
        }
    }

    const initialSetVenue = () => {
        for (let i = 1; i <= Venues.length; i++) {
            const option = document.createElement('option')
            option.value = Venues[i - 1].venue_name
            option.text = Venues[i - 1].venue_name
            venueRef.current.appendChild(option)
        }
    }

    const selectIning = (e) => {
        setIningState(e.target.value)
    }

    const selectTeamA = (e) => {
        setTeamAState(e.target.value)
    }

    const selectTeamB = (e) => {
        setTeamBState(e.target.value)
    }
    const selectVenue = (e) => {
        setVenueState(e.target.value)
    }

    useEffect(() => {
        initialSetIning();
        initialSetTeamA();
        initialSetTeamB();
        initialSetVenue();
        loadGame(setGameInfoState);
    }, [])

    const handleAddGame = () => {
        setGameInfoState([
            ...gameInfoState, {
                ining: iningRef.current.value,
                school_name: teamARef.current.value,
                school_name_2: teamBRef.current.value,
                venue: venueRef.current.value
            }
        ])

        console.log(gameInfoState)
    }

    const handleGoPage = (TeamA, TeamB) => {
        window.location.href = 'http://localhost:3000/home/input_mode/Sokuho_Input_Makegame/InputPlayGame/' + TeamA + TeamB;
    }


    return (
        <>
            <h1>試合作成画面</h1>
            <div className="MakeGame">
                回戦　<select ref={iningRef} value={iningState} onChange={selectIning} ></select><br />
                チームA <select ref={teamARef} value={teamAState} onChange={selectTeamA} ></select><br />
                チームB <select ref={teamBRef} value={teamBState} onChange={selectTeamB} ></select><br />
                会場 <select ref={venueRef} value={venueState} onChange={selectVenue} ></select><br />
                <select></select><br />
                <button onClick={handleAddGame}>追加</button>
            </div>

            <hr></hr>

            <div className="dispGames">
                {gameInfoState.map(gameInfo => (
                    <div className="game">
                        <button
                            onClick={() => PageTransition(gameInfo.TeamA + "vs" + gameInfo.TeamB + "/starting_member")}>
                            {gameInfo.ining}回戦<br />
                            {gameInfo.school_name}<br />
                            {gameInfo.school_name_2}<br />
                            {gameInfo.venue}
                        </button><br /><br />
                    </div>
                ))}

            </div>

        </>
    )
}

export default Sokuho_Input_Makegame