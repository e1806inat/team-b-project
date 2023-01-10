import React from 'react'
import { useNavigate } from 'react-router-dom'

import { TitleBar } from '../OtherPage/TitleBar/TitleBar'
import './home.css'




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
                        onClick={() => PageTransition("./Login")}
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