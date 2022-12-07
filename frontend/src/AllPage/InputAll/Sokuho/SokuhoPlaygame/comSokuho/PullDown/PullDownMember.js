import './PullDown.css';
const { Position } = require("../../../../../../DB/Position")


export const PullDownMember = (props) => {



    return (
        <div className="PullDown">

            <ul id="dropmenu">
                <li className='cannotTouchLi'><a className='cannotTouchA' href="#">打者</a></li>
                <li><a href="#">{props.battingOrder[0][props.battingOrder[1]].player_name_kanji}</a>
                    <ul>
                        {props.battingOrder[0].map((battingOrder) => {
                            return (
                                <>
                                    <li><a href="#">{battingOrder.player_name_kanji}</a></li>
                                </>
                            )
                        })}
                    </ul>
                </li>
                <li className='cannotTouchLi'><a className='cannotTouchA' href="#">投手</a></li>
                <li><a href="#">投手側</a>
                    <ul>
                        <li><a href="#">ヒット</a></li>
                        <li><a href="#">アウト</a></li>
                        <li><a href="#">エラー</a></li>
                        <li><a href="#">ホームラン</a></li>
                        <li><a href="#">バント</a></li>
                    </ul>
                </li>
            </ul>

        </div>
    );
}

export default PullDownMember;

