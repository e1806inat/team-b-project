import React from 'react';
import Tournament from './tournament';

const TournamentList = ({list1}) =>{
  return list1.map((value)=>(
    <Tournament value={value} key={value.id}/>
  ));
};

export default TournamentList;