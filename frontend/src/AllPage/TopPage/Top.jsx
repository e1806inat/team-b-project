import React from 'react'
import { useNavigate } from 'react-router-dom'

import { TitleBar } from '../OtherPage/TitleBar/TitleBar'

//バックエンドのurlを取得
const backendUrl = require("../../DB/communication").backendUrl;


const Top = () => {

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
                <button class="btn" onClick={() => PageTransition('home/pre_input/input_tournament')}>事前入力</button>
                <button class="btn" onClick={() => PageTransition('home/sokuho/sokuho_select_tournament')}>速報入力</button>
                <button class="btn" onClick={() => PageTransition('home/acount_register')}>アカウント登録</button>
                <button class="btn" onClick={() => PageTransition("home/RegisterVenue")}>会場登録</button>
            </div>
        </div>
    )
}

export default Top;