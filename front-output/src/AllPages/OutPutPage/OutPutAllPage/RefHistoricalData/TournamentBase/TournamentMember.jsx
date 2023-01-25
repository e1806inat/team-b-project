import React from 'react'

import "./RefTournamentMember.css"

const TournamentMember = ({ member }) => {

  return (
    <table border="1" className='members_t'>
      <tr>
        <td width="5%" rowspan="2">{member.grade}</td>
        <td width="30%">{member.player_name_hira}</td>
        <td width="5%" rowspan="2">{member.handed_hit}</td>
        <td width="5%" rowspan="2">{member.handed_throw}</td>
        <td width="8%" rowspan="2">{member.hit_num}</td>
        <td width="8%" rowspan="2">{member.bat_num}</td>
        <td width="8%" rowspan="2">{member.BA.toFixed(3).toString().substr(1, 4)}</td>
      </tr>
      <tr>
        <td width="30%" rowspan="2">{member.player_name_kanji}</td>
      </tr>
    </table>
  )
}

export default TournamentMember;