import React, { useState, useEffect, useRef } from "react"
const { Schools } = require("../DB/Schools"); //分割代入
const { Venues } = require("../DB/Venues"); //分割代入


export const Sokuho_Input_Makegame = (useSchools, setUseSchools) => {
    const ining = 1;

    const iningRef = useRef(null)
    const teamARef = useRef(null)
    const teamBRef = useRef()
    const venueRef = useRef(null)

    const [iningState, setIningState] = useState(ining)
    const [teamAState, setTeamAState] = useState(1)
    const [teamBState, setTeamBState] = useState(1)
    const [venueState, setVenueState] = useState(1)

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
    }, [])

    return (
        <>
            <h1>試合作成画面</h1>
            <div className="MakeGame">
                回戦　<select ref={iningRef} value={iningState} onChange={selectIning} ></select><br />
                チームA <select ref={teamARef} value={teamAState} onChange={selectTeamA} ></select><br/>
                チームB <select ref={teamBRef} value={teamBState} onChange={selectTeamB} ></select><br/>
                会場 <select ref={venueRef} value={venueState} onChange={selectVenue} ></select>
            </div>

        </>
    )
}

export default Sokuho_Input_Makegame