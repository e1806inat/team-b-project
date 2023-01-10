import './OptionButton.css'

export const OptionButton = () => {

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
                    <header>お店情報</header>
                    <ul>
                        <li>
                            <li>
                                <a href="#"><i class="fas fa-coffee"></i>コーヒー</a>
                                <a href="#"><i class="fas fa-coffee"></i>コーヒー</a>
                            </li>
                        </li>
                    </ul>
                </div>
                <div class="bg"></div>
            </div>
        </>
    )
}

export default OptionButton