import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { useCookies } from "react-cookie";

import { TitleBar } from './TitleBar/TitleBar'

import TournamentList from "./TournamentList";
import './FrontendHome.css'

//バックエンドのurlを取得
const backendUrl = require("../../DB/communication").backendUrl;


const FrontendHome = () => {

    const [tournamentsData, setTournamentsData] = useState([]);

    const readTournamnents = () => {
        fetch("http://localhost:5000/tournament/tournament_call", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTournamentsData(data);
            })
    }

    useEffect(() => {
        readTournamnents();
    }, [])

    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    return (
        <div>
            <div className="frontHomeBox">
                <p>選手情報</p>
            </div>
            <div class="tournamentBtn" onClick={() => PageTransition("frontend_home")}>
                <span>〉</span>
                <span className='p' onClick={() => PageTransition('pre_input/input_tournament')}>選手情報</span>
            </div>
            <div className="frontHomeBox">
                <p>１打席速報</p>
            </div>
            <div className="tournamentList">
                <TournamentList tournaments={tournamentsData} />
            </div>
        </div>
    )
}

export default FrontendHome;