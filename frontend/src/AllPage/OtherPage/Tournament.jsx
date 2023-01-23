import React from 'react'
import { useNavigate } from 'react-router-dom'

import './FrontendHome.css';

const Tournament = ({ tournament }) => {

    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    console.log(typeof (tournament.opening))

    return (
        // <button class="tournamentBtn" onClick={() => PageTransition("frontend_home")}>{tournament.opening.substr(0,4)}年　{tournament.tournament_name}</button>
        // <div class="tournamentBtn" onClick={() => PageTransition("frontend_home")}>
        //     <span>〉</span>
        //     <span>{tournament.opening.substr(0,4)}年　</span>
        //     <span className='p'>{tournament.tournament_name}</span>
        // </div>
        <div className='tournamentBox'>
            <table border={1} className='tournamentTable'>
                <tr>
                    <td rowspan="3">〉</td><span className='tournamentName' onClick={() => PageTransition('pre_input/input_tournament')}><td rowspan="2"><p className='pName'>{tournament.opening.substr(0, 4)}年　</p></td><td rowspan="3"><p className='pName'>{tournament.tournament_name}</p></td></span>
                </tr>
            </table>
        </div>
    )
}

export default Tournament;