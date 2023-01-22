import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { useCookies } from "react-cookie";

import { TitleBar } from '../OtherPage/TitleBar/TitleBar'
import './home.css'

//バックエンドのurlを取得
const backendUrl = require("../../DB/communication").backendUrl;


const Home = () => {

    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        const gameStart = async () => {
            const CheckSess = await fetch("http://localhost:5000/auth/check_sess", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sessionID : cookies.sessionID})
            })
            const sess = await CheckSess.text();

            console.log(sess)

            if (sess === 'logout') {
                navigate("/login");
                // return <Redirect to="http://localhost:3000/login"/>
            }
        }
        gameStart();
    }, [])

   

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
                <button class="btn" onClick={() => PageTransition('pre_input/input_tournament')}>事前入力</button>
                <button class="btn" onClick={() => PageTransition('sokuho/sokuho_select_tournament')}>速報入力</button>
                <button class="btn" onClick={() => PageTransition('acount_register')}>アカウント登録</button>
                <button class="btn" onClick={() => PageTransition("input_mode")}>過去データ参照</button>
                <button class="btn" onClick={() => PageTransition("output_game")}>出力直遷移</button>
            </div>
        </div>
    )
}

export default Home;