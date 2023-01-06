import React from 'react'
import Member from './Member'

const MemberList = ({members}) => {
    return members.map((member) => <Member member={member}/>);
  };
  
  export default MemberList;