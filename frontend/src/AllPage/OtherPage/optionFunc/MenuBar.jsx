import './OptionButton.css'
import { useNavigate, useSearchParams } from "react-router-dom";

//バックエンドのurlを取得
const backendUrl = require("../../../DB/communication").backendUrl;

//フロントエンドのurlを取得
const frontendUrl = require("../../../DB/communication").routeUrl


//ログアウトボタンを押したときに実行
const logOut = () => {
    fetch(backendUrl + "/auth/check_sess", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.text())
        .then((data) => { console.log(data) })
}


//メニューバーの項目を作成する
const makeBarCom = (menu, PageTransition) => {

    //受け取った情報を元にurlを作成する
    const makeUrl = (com) => {
        let madeUrl = -1

        if (com.text === "InputMember") {
            madeUrl =
                "/home/pre_input/input_tournament/inputschool/InputMember?" +
                "urlTournamentId=" + com.urlTournamentId + "&urlTournamentName=" + com.urlTournamentName +
                "&urlSchoolId=" + com.urlSchoolId + "&urlSchoolName=" + com.urlSchoolName
        }

        if (com.text === "InputSchool") {
            madeUrl =
                "/home/pre_input/input_tournament/inputschool?" +
                "urlTournamentId=" + com.urlTournamentId + "&urlTournamentName=" + com.urlTournamentName
        }

        return madeUrl
    }

    console.log(menu)

    //選手登録画面に飛ぶ項目を作成
    if (menu.text === "InputMember") {

        const comInfo1 =
        {
            text: "InputMember",
            urlTournamentId: menu.urlTournamentId,
            urlTournamentName: menu.urlTournamentName,
            urlSchoolId: menu.urlSchoolId,
            urlSchoolName: menu.urlSchoolName
        }

        const comInfo2 =
        {
            text: "InputMember",
            urlTournamentId: menu.urlTournamentId,
            urlTournamentName: menu.urlTournamentName,
            urlSchoolId: menu.urlSchoolId2,
            urlSchoolName: menu.urlSchoolName2
        }

        const url1 = makeUrl(comInfo1)
        const url2 = makeUrl(comInfo2)

        return (
            <>
                <li onClick={() => { PageTransition(url1) }}>
                    <a href="#"><i class="fas fa-qrcode"></i>選手登録（  {menu.urlSchoolName} ）</a>
                </li>
                <li onClick={() => { PageTransition(url2) }}>
                    <a href="#"><i class="fas fa-qrcode"></i>選手登録（  {menu.urlSchoolName2} ）</a>
                </li>
            </>
        )
    }

    //学校登録画面に飛ぶ項目を作成
    else if (menu.text === "InputSchool") {

        const comInfo1 =
        {
            text: "InputSchool",
            urlTournamentId: menu.urlTournamentId,
            urlTournamentName: menu.urlTournamentName
        }

        const url = makeUrl(comInfo1)

        return (
            <>
                <li onClick={() => { PageTransition(url) }}>
                    <a href="#"><i class="fas fa-qrcode"></i>チーム登録（  {menu.urlTournamentName} ）</a>
                </li>
            </>
        )
    }
}



export const MenuBar = (props) => {

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

                        {props.menuArray.length !== undefined &&
                            props.menuArray.map((menu) => (
                                <>
                                    {makeBarCom(menu, PageTransition)}
                                </>
                            ))
                        }

                        <li onClick={logOut}>
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

export default MenuBar