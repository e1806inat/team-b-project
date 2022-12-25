import './OptionButton.css'

//バックエンドのurlを取得
const backendUrl = require("../../../DB/communication").backendUrl;

export const OptionButton = () => {

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

    return (
        <>
            <div className="Options">

                <input type="checkbox" id="check"></input>
                <label for="check">
                    <i class="fas fa-bars" id="hambargerBtn"></i>
                    <i class="fas fa-times" id="cancelBtn"></i>
                </label>


                <div class="sidebar">
                    <div className="menuHeader">お店情報</div>
                    <ul>
                        <li >
                            <a href="#"><i class="fas fa-qrcode"></i>ダッシュボード</a>
                        </li>
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

export default OptionButton