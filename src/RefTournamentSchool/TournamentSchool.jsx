import React from 'react'
import { useNavigate } from 'react-router-dom'

import "./RefTournamentSchool.css"

const TournamentSchool = ({school, addInfo}) => {

  console.log(addInfo);

    // const handleTodoClick = () => {
    //     toggleTodo(todo.id);
    // };

    //ページ遷移用
  const navigate = useNavigate()
  const PageTransition = (url) => {
    navigate(url)
  }

  return (
    <div>
        <label>
            <button 
                    className='btn_In_tsch1'
                    onClick={() =>
                      // PageTransition(
                      //   "ref_PschoolData?urlSchoolId=" +
                      //   school.school_id +
                      //   "&urlSchoolName=" +
                      //   school.school_name                        
                      // )
                      PageTransition(
                        "ref_PschoolData?urlSchoolId=" +
                        school.school_id +
                        "&urlSchoolName=" +
                        school.school_name +   
                        "&urlTournamentId=" +
                        addInfo.tournament_id +
                        "&urlOption=" +
                        addInfo.option
                        //optionArray[nowOption[0]].option
                      )
                    }>
               <p>{school.school_name} ></p> 
            </button>
        </label>
        </div>
  )
}

export default TournamentSchool;