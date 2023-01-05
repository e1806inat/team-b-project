import React from 'react'
import School from "./School"

import "./RefSchool.css"

const SchoolList = ({schools, gradesArray, option}) => {
  return schools.map((school) => <School school={school} gradesArray={gradesArray}  option={option}/>);
};

export default SchoolList;