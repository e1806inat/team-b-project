import React from 'react';
import {useState, useRef} from "react";
import TournamentList from './tournamentlist';
import { v4 as uuidv4 } from "uuid";

const TournamentApp = () => {
  const[list1, setList] = useState([]);
  const numberRef = useRef();
  const tournamentRef = useRef();
  const now = new Date();
  const nowdate = now.toLocaleString( "ja-JP-u-ca-japanese" ,{ era : "long" });
  const datelist = nowdate.split('/');

  const handleAddTournament = () =>{
    const number = '第'+ numberRef.current.value + '回';
    const tournament = tournamentRef.current.value;
    const era = datelist[0] + '年'
    const tournamentname = era + number + tournament;
    if(number === "" || tournament === ""){
      return;
    }
    setList((prevlist)=>{
      return[...prevlist, {id: uuidv4(), name: tournamentname}];
    })
  };

  return (
    <div>
      第<input type='number' min='0' ref={numberRef}/>回
      <input type="text" ref={tournamentRef} />
      <button onClick={handleAddTournament}>大会を追加</button>
      <TournamentList list1={list1}/>
    </div>
  );
};

export default TournamentApp;
