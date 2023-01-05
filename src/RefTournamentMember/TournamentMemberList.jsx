import React from 'react'
import TournamentMember from './TournamentMember'

const TournamentMemberList = ({members}) => {
    return members.map((member) => <TournamentMember member={member}/>);
  };
  
  export default TournamentMemberList;