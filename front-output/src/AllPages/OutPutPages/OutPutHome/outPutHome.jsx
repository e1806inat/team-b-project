import React, { useState, useEffect } from "react";
import { OptionFunc } from '../../../Functions/OptionFunc/OptionFunc'
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import GameList from "./GameList";


const goToPage = () => {
    console.log("移動します")
}

const OutPutHome = () => {

    const [searchParams] = useSearchParams();
    // const urlTournamentId = searchParams.get("urlTournamentId");
    // const urlTournamentName = searchParams.get("urlTournamentName");
    const urlTournamentId = 35;
    const urlTournamentName = 'aaaa';
    //const tournament = {tournament_id:urlTournamentId, tournament_name:urlTournamentName}

    const [gamesData, setGamesData] = useState([]);
    const [gamesState, setGamesState] = useState([]);

    //
    const readGames = (setGamesData) => {
        // fetch(backendUrl + "/tournament/tournament_call", {
        fetch("http://localhost:5000/game/game_call", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tournament_id: urlTournamentId })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setGamesData(data);
            })
    }

     //school_callをフェッチし学校のデータを取得する
     const readGamesState = (setGamesState) => {
        // fetch(backendUrl + "/tournament/tournament_call", {
        fetch("http://localhost:5000/game/ref_during_game", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setGamesState(data);
            })
    }

    useEffect(() => {
        readGames(setGamesData);
        readGamesState(setGamesState);
        console.log('動いてます');
    }, []);

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    //オプションメニューのための配列作るよ
    const optionArray = [{ name: "過去データ", url: "/PastDataHome" }]


    return (
        <>
            <OptionFunc
                menuName={"メニュー"}
                optionArray={optionArray}
                PageTransition={PageTransition}
            ></OptionFunc>

            <div class="whole">
                <div class='gameName'>{urlTournamentName}</div>
                <GameList games={gamesData} duringGames={gamesState}/>
            </div>
        </>

    );
}

export default OutPutHome;
