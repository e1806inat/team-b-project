// import { OptionFunc } from '../../../../../../'
// import { OptionFunc } from '../../../../../Functions/OptionFunc/OptionFunc'
import { useState } from 'react';
import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Bulletin from '../Bulletin/Bulletin';

import "./home.css"

//バックエンドのurlを取得
const backendUrl = require("../../../../../DB/communication").backendUrl;

const goToPage = (PageTransition, gameId) => {
    console.log(gameId)
    PageTransition("Bulletin?urlGameId=" + gameId)
}


const GameComponent = {
    first_rear_1: "", first_rear_2: "", game_id: 0, game_ymd: "", match_num: "", match_results: null,
    school_id_1: 0, school_id_2: 0, school_name_1: "", school_name_2: "", tournament_id: 0, venue_id: 0,
    venue_name: ""
}


const GoTobutton = (props) => {
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    return (
        <div className='goToRefMemberPageButton'>
            <span
                onClick={() => {
                    PageTransition(
                        "RefTournamentSchool?" +
                        "urlTournamentId=" + props.tournament_id +
                        "&urlTournamentName=" + props.tournament_name
                    )
                }}
            >
                {"　"}＞選手情報を見る
            </span>
        </div>

    )
}

//



//データベースから大会情報を読み出す
const getGame = async (urlTournamentId, setGameList) => {

    //データベースから試合情報全体を読み出すフェッチ文
    const funcGL = await fetch(backendUrl + "/game/game_call", {
        method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ tournament_id: urlTournamentId }),
    })
    const receivedGL = await funcGL.json()

    //試合中の試合を参照するフェッチ文
    const funcDG = await fetch(backendUrl + "/game/ref_during_game", {
        method: "POST", mode: "cors", headers: { "Content-Type": "application/json", }
    })
    const receivedDG = await funcDG.json()

    // 試合中かそうでないか振り分ける
    let BeforeG = [GameComponent]; let DuringG = [GameComponent]; let PastG = [GameComponent];
    receivedGL.map((u) => {

        // if (receivedDG.some((v) => v.game_id === u.game_id)) {
        //     DuringG = [...DuringG, u]
        // }
        // else {
        //     if (u.match_results === null) {
        //         BeforeG = [...BeforeG, u]
        //     }
        //     else { PastG = [...PastG, u] }
        // }

        if (u.match_results !== null) {
            PastG = [...PastG, u]
        }
        else {
            if (receivedDG.some((v) => v.game_id === u.game_id)) {
                DuringG = [...DuringG, u]
            }
            else { BeforeG = [...BeforeG, u] }
        }
    })
    console.log({ BeforeG: BeforeG, DuringG: DuringG, PastG: PastG })
    setGameList({ BeforeG: BeforeG, DuringG: DuringG, PastG: PastG })
}

const getAllGame = async () => {
    //データベースから試合情報全体を読み出すフェッチ文
    const funcLAG = await fetch(backendUrl + "/game/game_status", {
        method: "POST", mode: "cors", headers: { "Content-Type": "application/json", },
    })
    const receivedLAG = await funcLAG.json()
    await console.log(receivedLAG)
}

//試合中の試合の情報を参照する
const RefDuringGame = async () => {
    fetch(backendUrl + "/game/ref_during_game", {
        method: "POST", mode: "cors", headers: { "Content-Type": "application/json", }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
}

//

const GameList = () => {

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    const [searchParams] = useSearchParams();

    const urlTournamentId = searchParams.get("urlTournamentId")
    const urlTournamentName = searchParams.get("urlTournamentName")
    const urlTournamentOpening = searchParams.get("urlTournamentOpening").split("-")

    //大会情報を管理するステイト
    const [rgsTournament, setRgsTournament] = useState([])

    const initialGL = {
        BeforeG: [GameComponent],
        DuringG: [GameComponent],
        PastG: [GameComponent]
    }

    //試合リストを管理するステイト
    const [gameList, setGameList] = useState(initialGL)

    //オプションメニューのための配列作るよ
    const optionArray = [{ name: "過去データ", url: "/PastDataHome" }]


    useEffect(() => {
        const handleUseEffect = async () => {
            await getGame(urlTournamentId, setGameList)
            getAllGame()
            // await RefDuringGame()
        }

        //useEffectの内部を実行
        handleUseEffect()
    }, [])


    return (
        <>
            {/* <OptionFunc
                menuName={"メニュー"}
                optionArray={optionArray}
                PageTransition={PageTransition}
            ></OptionFunc> */}


            <div class="whole">
                <div class="date">
                    {/* <!-- <input type="date" name="today" id="today"> --> */}
                    2023年10月30日(日)
                </div>
                <div class='targetModules'>
                    <div class='gameName'>{urlTournamentName}</div>
                    <GoTobutton
                        tournament_id={urlTournamentId}
                        tournament_name={urlTournamentName}
                    /><br />

                    {/* 試合中 */}
                    {gameList.DuringG.map((game, ind) => {
                        let ymd = game.game_ymd.split("-")
                        if (game.school_id_1 !== 0) {
                            return (
                                <>
                                    <span>
                                        現在試合中<br />
                                        {ymd[0]}年{ymd[1]}月{ymd[2]}日
                                        <div class="displayGames" onClick={() => { goToPage(PageTransition, game.game_id) }}>
                                            <div class='gameDetaile'>
                                                <div class='gameRound'>{game.match_num}回戦</div>
                                                <div class='gameCard'>

                                                    <div class='firstAttackTeam, teamName'>{game.school_name_1}</div>
                                                    <div class='gameScore'>
                                                        <div class='firstAttackTeamScore'>1</div>
                                                        <div class='gameState'>5回裏</div>
                                                        <div class='secondAttackTeamScore'>3</div>
                                                    </div>
                                                    <div class='secondAttackTeam, teamName'>{game.school_name_2}</div>
                                                </div>
                                                <div class="gamePlace">{game.venue_name}</div>
                                            </div>
                                            <p></p>

                                        </div>
                                    </span>

                                </>
                            )
                        }
                    })}

                    {/* 試合前 */}
                    {gameList.BeforeG.map((game, ind) => {
                        let ymd = game.game_ymd.split("-")
                        if (game.school_id_1 !== 0) {
                            return (
                                <>
                                    {ymd[0]}年{ymd[1]}月{ymd[2]}日
                                    <div class="displayGames" >
                                        <div class='gameDetaile'>
                                            <div class='gameRound'>{game.match_num}回戦</div>
                                            <div class='gameCard'>
                                                <div class='firstAttackTeam, teamName'>{game.school_name_1}</div>
                                                試合前
                                                <div class='secondAttackTeam, teamName'>{game.school_name_2}</div>
                                            </div>
                                            <div class="gamePlace">{game.venue_name}</div>
                                        </div>
                                        <p></p>

                                    </div>
                                </>
                            )
                        }
                    })}

                    {/* 試合後 */}
                    {gameList.PastG.map((game, ind) => {
                        let ymd = game.game_ymd.split("-")
                        if (game.school_id_1 !== 0) {
                            return (
                                <>
                                    試合終了<br />
                                    {ymd[0]}年{ymd[1]}月{ymd[2]}日
                                    <div class="displayGames" onClick={() => { goToPage(PageTransition, game.game_id) }}>
                                        <div class='gameDetaile'>
                                            <div class='gameRound'>{game.match_num}回戦</div>
                                            <div class='gameCard'>
                                                <div class='firstAttackTeam, teamName'>{game.school_name_1}</div>
                                                <div class='gameScore'>
                                                    <div class='firstAttackTeamScore'>1</div>
                                                    <div class='gameState'>5回裏</div>
                                                    <div class='secondAttackTeamScore'>3</div>
                                                </div>
                                                <div class='secondAttackTeam, teamName'>{game.school_name_2}</div>
                                            </div>
                                            <div class="gamePlace">{game.venue_name}</div>
                                        </div>
                                        <p></p>

                                    </div>
                                </>
                            )
                        }
                    })}

                    {(
                        gameList.BeforeG.length === 1 &&
                        gameList.DuringG.length === 1 &&
                        gameList.PastG.length === 1
                    ) &&
                        <>
                            試合は登録されていません
                        </>
                    }

                </div>
            </div>
        </>

    );
}

export default GameList;
