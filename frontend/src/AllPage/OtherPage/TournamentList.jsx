import React from 'react'
import Tournament from './Tournament'

import './FrontendHome.css';

const TournamentList = ({tournaments}) => {
    return tournaments.map((tournament) => <Tournament tournament={tournament}/>);
  };
  
  export default TournamentList;