import React, { useState, useEffect } from 'react'

const Game = ({ game }) => {

    const [nowState, setNowState] = useState('');
   
    console.log(game.match_results)
    if (game.match_results !== null) {
        var matchResult1 = game.match_results.split('-')[0];
        var matchResult2 = game.match_results.split('-')[1];
    }

    if (game.game_ymd !== null) {
        var gameYear = game.game_ymd.split('-')[0];
        console.log(gameYear)
        var gameMonth = game.game_ymd.split('-')[1];
        var gameDay = game.game_ymd.split('-')[2];

    }

    const readGameState = (game) => {
        if (game.tmp_table_name !== undefined) {
            // fetch(backendUrl + "/tournament/tournament_call", {
            fetch("http://localhost:5000/daseki/tmp_daseki_state", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ table_name: game.tmp_table_name})
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data[0]['inning']);
                    var stateArray = data[0]['inning'].toString().split("");

                    if (stateArray[Array.length - 1] === 1) {
                        setNowState(stateArray[0] + '回表');
                    } else {
                        setNowState(stateArray[0] + '回裏');
                    }
                    //setGameState(data);
                })
        }
    }

    useEffect(() => {
        readGameState(game);
        //inningCal(gameState);
        console.log('動いてます');
    }, []);

    if (game.tmp_table_name !== undefined) {
        return (
            <div>
                <div class="date">
                    {/* <!-- <input type="date" name="today" id="today"> --> */}
                    {gameYear}年{gameMonth}月{gameDay}日
                </div>
                <div class='targetModules'>

                    {/* <div class="displayGames" onClick={goToPage}> */}
                    <div class="displayGames" >
                        <div class='gameDetaile'>
                            <div class='gameRound'>{game.match_num}</div>
                            <div class='gameCard'>
                                <div class='firstAttackTeam, teamName'>{game.school_name_1}</div>
                                <div class='gameScore'>
                                    <div class='firstAttackTeamScore'>{matchResult1}</div>
                                    <div class='gameState'>{nowState}</div>
                                    <div class='secondAttackTeamScore'>{matchResult2}</div>
                                </div>
                                <div class='secondAttackTeam, teamName'>{game.school_name_2}</div>
                            </div>
                            <div class="gamePlace">{game.venue_name}</div>
                        </div>
                        <p></p>

                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div class="date">
                    {/* <!-- <input type="date" name="today" id="today"> --> */}
                    {gameYear}年{gameMonth}月{gameDay}日
                </div>
                <div class='targetModules'>

                    {/* <div class="displayGames" onClick={goToPage}> */}
                    <div class="displayGames" >
                        <div class='gameDetaile'>
                            <div class='gameRound'>{game.match_num}</div>
                            <div class='gameCard'>
                                <div class='firstAttackTeam, teamName'>{game.school_name_1}</div>
                                <div class='gameScore'>
                                    <div class='firstAttackTeamScore'>{matchResult1}</div>
                                    <div class='secondAttackTeamScore'>{matchResult2}</div>
                                </div>
                                <div class='secondAttackTeam, teamName'>{game.school_name_2}</div>
                            </div>
                            <div class="gamePlace">{game.venue_name}</div>
                        </div>
                        <p></p>

                    </div>
                </div>
            </div>
        )
    }

}

export default Game;