import '../../Option.css'

export const Option = () => {



    return (

        <div className="Options">

            <input type="checkbox" id="check"></input>
            <label for="check">
                <i class="fas fa-bars" id="hambargerBtn"></i>
                <i class="fas fa-times" id="cancelBtn"></i>
            </label>


            <div class="sidebar">
                <header>お店情報</header>
                <ul>
                    <li>
                        <a href="#"><i class="fas fa-qrcode"></i>ダッシュボード</a>
                        <li>
                            <a href="#"><i class="fas fa-coffee"></i>コーヒー</a>
                        </li>
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

    )

}

export default Option;