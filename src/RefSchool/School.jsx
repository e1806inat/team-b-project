import React from 'react'
import { useNavigate } from 'react-router-dom'

import "./RefSchool.css"

const School = ({ school, gradesArray, option }) => {

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
          className='btn_In_sch1'
          onClick={() => {
            // let gradesArray = [];
            // for (var item of grades) {
            //   if (item.completed) {
            //     gradesArray.push(item.grade);
            //   }
            // }
            PageTransition(
              "ref_schoolData?urlSchoolId=" +
              school.school_id +
              "&urlSchoolName=" +
              school.school_name +
              "&urlGrades=" +
              gradesArray +
              "&urlOption=" +
              option 
            )
          }}>
          <p>{school.school_name} ></p>
        </button>
      </label>
    </div>
  )
}

export default School;