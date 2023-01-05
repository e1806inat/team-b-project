import React from 'react'
import TournamentSchool from "./TournamentSchool"

import "./RefTournamentSchool.css"

const TournamentSchoolList = ({schools, addInfo}) => {
  return schools.map((school) => <TournamentSchool school={school} addInfo={addInfo}/>);
};

export default TournamentSchoolList;