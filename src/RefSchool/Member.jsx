import React from 'react'

//import "./RefSchoolData.css"

const Member = ({member}) => {

    // const handleTodoClick = () => {
    //     toggleTodo(todo.id);
    // };
    if(member.grade === 4){
        member.grade='既卒';
    }
  return (
    // <div className='MemberData'>
    //     <div className='MemberGrade'>
    //         {member.grade}
    //     </div>
    //     <div className='MemberName'>
    //         <div className='MemberNameHira'>
    //             {member.player_name_hira}
    //         </div>
    //         <div className='MemberNameKanji'>
    //             {member.player_name_kanji}
    //         </div>
    //     </div>
    //     <div className='MemberHandHit'>
    //         {member.handed_hit}
    //     </div>
    //     <div className='MemberHandThrow'>
    //         {member.handed_throw}
    //     </div>
    //     <div className='MemberHitNum'>
    //         {member.hit_num}
    //     </div>
    //     <div className='MemberBatNum'>
    //         {member.bat_num}
    //     </div>
    //     <div className='BA'>
    //         {member.BA}
    //     </div>
    // </div>
    <table border="1" className='members'>
        <tr>
            <td width="50" rowspan="2">{member.grade}</td>
            <td width="300">{member.player_name_hira}</td>
            <td width="50" rowspan="2">{member.handed_hit}</td>
            <td width="50" rowspan="2">{member.handed_throw}</td>
            <td width="75" rowspan="2">{member.hit_num}</td>
            <td width="75" rowspan="2">{member.bat_num}</td>
            <td width="75" rowspan="2">{member.BA}</td>
        </tr>
        <tr>
            <td width="300" rowspan="2">{member.player_name_kanji}</td>
        </tr>
    </table>
  )
}

export default Member;