import React from 'react'
import StartingMember from './StartingMember'

const StartingMemberList = ({startingMembers}) => {
    return startingMembers.map((startingMember) => <StartingMember startingMember={startingMember}/>);
  };
  
  export default StartingMemberList;