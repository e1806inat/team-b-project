import React from 'react';
import Tournament from './tournament';

const TournamentList = (list1) =>{
  return list1.map((list)=>(
    <Tournament list={list} key={list.id}/>
  ));
};

export default TournamentList;