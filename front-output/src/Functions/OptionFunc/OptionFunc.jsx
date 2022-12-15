import './home.css'
import './style.css'

export const OptionFunc = (props) => {
    return (
        <>
            <div>
                {/* <!-- toggle section --> */}
                <input type="checkbox" id="check"></input>
                <label for="check">
                    <i class="fas fa-bars" id="hambargerBtn"></i>
                    <i class="fas fa-times" id="cancelBtn"></i>
                </label>

                {/* <!-- sidebar section --> */}
                <div class="sidebar">
                    <header>{props.menuName}</header>
                    <ul>
                        <li>
                            <a href="#"><i class="fas fa-qrcode"></i>ダッシュボード</a>
                            <a href="#"><i class="fas fa-coffee"></i>コーヒー</a>
                            {props.optionArray.map((oneOption) => (
                                <>
                                    <a href="#" onClick={() => { console.log("aa"); props.PageTransition(oneOption.url); }}>
                                        <i className="fas fa-coffee"></i>{oneOption.name}
                                    </a>
                                </>
                            ))}

                        </li>
                    </ul>
                </div>
                <div class="bg"></div>
            </div>
        </>

    )
}