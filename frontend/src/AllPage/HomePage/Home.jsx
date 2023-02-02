import React from 'react'
import { useNavigate } from 'react-router-dom'

import { TitleBar } from '../OtherPage/TitleBar/TitleBar'
import './home.css'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'


//バックエンドのurlを取得
const backendUrl = require("../../DB/communication").backendUrl;

//フロントの階層urlを取得
const routeUrl = require("../../DB/communication").routeUrl;




const Home = () => {

    const [cookies, setCookie, removeCookie] = useCookies();

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    useEffect(() => {
        const gameStart = async () => {
            const CheckSess = await fetch(backendUrl + "/auth/check_sess",
                {
                    method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
                    body: JSON.stringify({ sessionID: cookies.sessionID })
                })
            const sess = await CheckSess.text();
            console.log(sess)
            console.log(cookies.sessionID)
            if (sess === 'logout') {
                PageTransition(routeUrl + "/login");
                // return <Redirect to="http://localhost:3000/login"/>            
            }
        }
        gameStart()
    }, [])



    return (
        <div>

            <header className='homeHeader'>
                <div class="heading">HOME</div>
                <div class="logout">
                    <button><i
                        class="fa-solid fa-arrow-right-from-bracket"
                        onClick={() => {
                            fetch(backendUrl + "/auth/logout", {
                                method: "POST", mode: "cors",
                                headers: { "Content-Type": "application/json", },
                                body: JSON.stringify({ sessionID: cookies.sessionID })
                            })
                                .then((response) => response.text())
                                .then((data) => { console.log(data) })
                            PageTransition(routeUrl + "/login")
                        }}
                    ></i></button>
                </div>
            </header>



            <div class="whole">
                <button class="btn" onClick={() => PageTransition('pre_input/input_tournament')}>事前入力</button>
                <button class="btn" onClick={() => PageTransition('sokuho/sokuho_select_tournament')}>速報入力</button>
                <button class="btn" onClick={() => PageTransition('acount_register')}>アカウント登録</button>
                <button class="btn" onClick={() => PageTransition("RegisterVenue")}>会場登録</button>
            </div>
        </div>
    )
}

export default Home;