import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import './OptionButton.css'

//バックエンドのurlを取得
const backendUrl = require("../../../DB/communication").backendUrl;

//フロントの階層urlを取得
const routeUrl = require("../../../DB/communication").routeUrl;

const logOut = (PageTransition, cookies) => {
    fetch(backendUrl + "/auth/logout", {
        method: "POST", mode: "cors",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ sessionID: cookies.sessionID })
    })
        .then((response) => response.text())
        .then((data) => { console.log(data) })
    PageTransition(routeUrl + "/login")
}

export const OptionButton = () => {

    const [cookies, setCookie, removeCookie] = useCookies();

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }


    return (
        <>
            <div className="Options">

                <input type="checkbox" id="check"></input>
                <label for="check">
                    <i class="fas fa-bars" id="hambargerBtn"></i>
                    <i class="fas fa-times" id="cancelBtn"></i>
                </label>


                <div class="sidebar">
                    <div className="menuHeader">menu</div>
                    <ul>
                        <li onClick={() => { logOut(PageTransition, cookies) }}>
                            <a href="#"><i class="fas fa-coffee"></i>ログアウト</a>
                        </li>
                    </ul>
                </div>

                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
                    integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
                    crossorigin="anonymous"
                />

            </div>
        </>
    )
}

export default OptionButton