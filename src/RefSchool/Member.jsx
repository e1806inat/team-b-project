import React from 'react'

const Member = ({member}) => {

    //仕様上DBには卒業生の学年(grade)は4として記録されている
    //なのでここでgradeが4である選手のgradeを既卒に変更して表示する
    if(member.grade === 4){
        member.grade='既卒';
    }
  return (
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