import { useNavigate } from 'react-router-dom'
import './home.css'

export const PastDataHome = () => {
    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    return (
        <div>

            <header className='HomeTop'>
                <div class="heading">過去データ参照</div>
                <div class="logout">
                    <button><i 
                    class="fa-solid fa-arrow-right-from-bracket"
                    onClick={() => PageTransition("/")}
                    ></i></button>
                </div>
            </header>


            <div class="whole">
                <button class="btn" onClick={() => PageTransition('pre_input/input_tournament')}>大会データ</button>
                <button class="btn" onClick={() => PageTransition('sokuho/sokuho_select_tournament')}>学校データ</button>
                <button class="btn" onClick={() => PageTransition('acount_register')}>選手データ</button>
            </div>
        </div>
    )
}

export default PastDataHome