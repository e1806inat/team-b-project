import React from 'react'

import "./RefTournamentMember.css"

const TournamentMember = ({member}) => {

  return (
    <table border="1" className='members_t'>
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

export default TournamentMember;