import React from 'react';
import {useState, useRef} from "react";
// import TournamentList from './tournamentlist';
import { v4 as uuidv4 } from "uuid";

const TournamentApp = () => {
  const[list1, setList] = useState([]);
  const numberRef = useRef();
  const tournamentRef = useRef();
  const now = new Date();
  const nowdate = now.toLocaleString( "ja-JP-u-ca-japanese" ,{ era : "long" });
  const datelist = nowdate.split('/');

  const handleAddTournament = () =>{
    const number = numberRef.current.value;
    const tournament = tournamentRef.current.value;
    const tournamentname = datelist[0] + '年第' + number +'回' +tournament;
    console.log(tournamentname);
    if(number === "" && tournament === ""){
      return;
    }
    setList((prevlist)=>{
      return[...prevlist, {id: uuidv4(), name: tournamentname}];
    })
  };

  return (
    <div>
      <input type='number' min='0' ref={numberRef}/>
      <input type="text" ref={tournamentRef} />
      <button onClick={handleAddTournament}>大会を追加</button>
      {/* <TournamentList list1={list1}/> */}
    </div>
  );
};

export default TournamentApp;
