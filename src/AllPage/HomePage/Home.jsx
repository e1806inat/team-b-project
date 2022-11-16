import React from 'react'
import { useNavigate } from 'react-router-dom'



const Home = () => {

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    return (
        <div>
            <h1>Home</h1>
            <p>
                <button onClick={()=>PageTransition('pre_input/input_tournament')}>
                    事前入力
                </button>
                <button onClick={()=>PageTransition('sokuho/sokuho_input_makegame')}>
                    速報入力
                </button>
                <button onClick={()=>PageTransition('acount_register')}>
                    アカウント登録
                </button>
                <button onClick={()=>PageTransition("input_mode")}>
                    過去データ参照
                </button>
                <button onClick={()=>PageTransition("InputPlayGame")}>
                    速報入力直遷移画面
                </button>
                <button onClick={()=>PageTransition("output_game")}>
                    出力直遷移
                </button>
            </p>
        </div>
    )
}

export default Home;