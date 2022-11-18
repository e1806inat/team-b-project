import React from "react";
import PrintTournament from './print_tournament'


const Tournament = () =>{
    const list1 = ['A高校','B高校','C高校','D高校','E高校','F高校',0,'G高校','A高校','B高校','C高校','D高校','E高校','F高校',0,'G高校']
    return (
      <div>
        <PrintTournament list1 = {list1}/>
      </div>
    );
  }


export default Tournament;