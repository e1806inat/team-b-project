import React from 'react'

const Daseki = ({dasekiInfo}) => {

    // const handleTodoClick = () => {
    //     toggleTodo(todo.id);
    // };
    //var nowInning = '';
    var stateArray = dasekiInfo.inning.toString().split("");
    if (stateArray[Array.length - 1] === 1) {
        dasekiInfo.inning = stateArray[0] + '回表';
    } else {
        dasekiInfo.inning = stateArray[0] + '回裏';
    }
  return (
   <div>
    <p>{dasekiInfo.inning}</p>
    <p>{dasekiInfo.text_inf}</p>
   </div>
  )
}

export default Daseki;