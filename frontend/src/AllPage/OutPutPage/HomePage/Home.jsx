import React from 'react'
import { useNavigate } from 'react-router-dom'

import { TitleBar } from '../../OtherPage/TitleBar/TitleBar'
import './home.css'

//バックエンドのurlを取得
const backendUrl = require("../../../DB/communication").backendUrl;


const Home = () => {

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    return (
        <div>

            <header className='homeHeader'>
                <div class="heading">HOME</div>
                <div class="logout">
                    <button><i
                        class="fa-solid fa-arrow-right-from-bracket"
                        onClick={() => {
                            fetch(backendUrl + "/auth/check_sess", {
                                method: "GET",
                                mode: "cors",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                                .then((response) => response.text())
                                .then((data) => { console.log(data) })
                            PageTransition(-1)
                        }}
                    ></i></button>
                </div>
            </header>



            <div class="whole">
                <button class="btn" onClick={() => PageTransition('SelectTournament')}>速報閲覧</button>
                <button class="btn" onClick={() => PageTransition('RefHistoricalData/SelectTournament')}>過去データ参照(大会遷移)</button>
                <button class="btn" onClick={() => PageTransition('RefHistoricalData/RefSchool')}>過去データ参照(選手全体)</button>
                <button class="btn" onClick={() => PageTransition('GameList')}>閲覧</button>
            </div>
        </div>
    )
}

export default Home;