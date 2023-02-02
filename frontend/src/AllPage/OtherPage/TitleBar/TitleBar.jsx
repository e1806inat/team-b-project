import './TitleBar.css'

export const TitleBar = (props) => {
    return (
        <>
            <header className="headerClass">
                <div className="heading">{props.TitleText}</div>
                <div className="back">
                    <button><i
                        class="fa-solid fa-chevron-left"
                        onClick={() => props.PageTransition(props.valueUrl)}
                    ></i></button>
                </div>
            </header>
        </>
    )
}