import './PullDown.css';
const { Position } = require("../../../../../../DB/Position")


export const PullDownMember = (props) => {

    console.log(props.dasekiAll)
    console.log(props.registeredMember1)
    console.log(props.battingOrder)
    

    return (
        <div className="PullDown">

            <ul id="dropmenu">
                {/* 先行チーム */}
                {props.nowIningState[1] === 0 &&
                    <>
                        <li className='cannotTouchLi'><a className='cannotTouchA' href="#">打者</a></li>
                        {console.log(props.nowPlayingMember)}
                        <li><a href="#">{props.battingOrder[props.nowPlayingMember[0].batter].player_name_kanji}</a>
                            <ul>
                                <li><a href="#">{"選手交代"}</a>
                                    <ul>
                                        {props.registeredMember1.map((regiMember1, ind) => {

                                            return (
                                                <>
                                                    <li
                                                        onClick={() => {

                                                            if (props.latestBatOrder.dasekiNum !== props.dasekiNum) {
                                                                props.latestBatOrder.dasekiNum = props.dasekiNum
                                                                props.latestBatOrder.order = props.battingOrder[props.nowPlayingMember[0].batter]
                                                            }
                                                            props.battingOrder[props.nowPlayingMember[0].batter] = props.registeredMember1[ind]
                                                            props.setIsPinch(
                                                                props.latestBatOrder.order.player_id + "→" +
                                                                regiMember1.player_id
                                                            )
                                                            console.log(props.latestBatOrder.order.player_name_kanji + "→" +
                                                                regiMember1.player_name_kanji)
                                                        }}
                                                    ><a href="#">{regiMember1.player_name_kanji}</a></li>
                                                </>
                                            )
                                        })}
                                    </ul>
                                </li>
                                {props.battingOrder.map((battingOrder, ind) => {
                                    return (
                                        <>
                                            <li onClick={() => {
                                                props.nowPlayingMember[0].batter = ind
                                                props.setNowPlayingMember(props.nowPlayingMember)
                                            }}>
                                                <a href="#" >{battingOrder.player_name_kanji}</a>
                                            </li>
                                        </>
                                    )
                                })}
                            </ul>
                        </li>
                        <li className='cannotTouchLi'><a className='cannotTouchA' href="#">投手</a></li>
                        <li><a href="#">{props.battingOrder2[props.nowPlayingMember[0].pitcher].player_name_kanji}</a>
                            <ul>
                                {props.registeredMember2.map((registeredMember2, ind) => {
                                    return (
                                        <>
                                            <li
                                                onClick={() => {
                                                    props.battingOrder2[props.nowPlayingMember[0].pitcher] = props.registeredMember2[ind]
                                                }}
                                            ><a href="#">{registeredMember2.player_name_kanji}</a></li>
                                        </>
                                    )
                                })}
                            </ul>
                        </li>
                    </>
                }

                {props.nowIningState[1] === 1 &&
                    <>
                        {/* 後攻チーム */}
                        <li className='cannotTouchLi'><a className='cannotTouchA' href="#">打者</a></li>
                        {console.log(props.nowPlayingMember)}
                        <li><a href="#">{props.battingOrder2[props.nowPlayingMember[1].batter].player_name_kanji}</a>
                            <ul>

                                <li><a href="#">{"打者交代"}</a>
                                    <ul>
                                        {props.registeredMember2.map((regiMember2, ind) => {
                                            return (
                                                <>
                                                    <li
                                                        onClick={() => {
                                                            if (props.latestBatOrder.dasekiNum !== props.dasekiNum) {
                                                                props.latestBatOrder.dasekiNum = props.dasekiNum
                                                                props.latestBatOrder.order = props.battingOrder2[props.nowPlayingMember[1].batter]
                                                            }
                                                            props.battingOrder2[props.nowPlayingMember[1].batter] = props.registeredMember2[ind]
                                                            props.setIsPinch(
                                                                props.latestBatOrder.order.player_id + "→" +
                                                                props.registeredMember2[ind].player_id
                                                            )
                                                        }}
                                                    ><a href="#">{regiMember2.player_name_kanji}</a></li>
                                                </>
                                            )
                                        })}
                                    </ul>
                                </li>
                                {props.battingOrder2.map((battingOrder2, ind) => {
                                    return (
                                        <>
                                            <li onClick={() => {
                                                props.nowPlayingMember[1].batter = ind
                                                props.setNowPlayingMember(props.nowPlayingMember)
                                            }}
                                            ><a href="#">{battingOrder2.player_name_kanji}</a></li>
                                        </>
                                    )
                                })}
                            </ul>
                        </li>
                        <li className='cannotTouchLi'><a className='cannotTouchA' href="#">投手</a></li>
                        <li><a href="#">{props.battingOrder[props.nowPlayingMember[1].pitcher].player_name_kanji}</a>
                            <ul>
                                {props.registeredMember1.map((registeredMember1, ind) => {
                                    return (
                                        <>
                                            <li
                                                onClick={() => {
                                                    props.battingOrder[props.nowPlayingMember[1].pitcher] = props.registeredMember1[ind]
                                                }}
                                            ><a href="#">{registeredMember1.player_name_kanji}</a></li>
                                        </>
                                    )
                                })}
                            </ul>
                        </li>
                    </>
                }

            </ul>

        </div>
    );
}

export default PullDownMember;


{/* <li className='cannotTouchLi'><a className='cannotTouchA' href="#">打者</a></li>
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
</li> */}
