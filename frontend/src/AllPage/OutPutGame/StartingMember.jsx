import React from 'react'

const StartingMember = ({startingMember}) => {

  return (
    <table border="1" className='startingMembers'>
        <tr>
            <td width="50" rowspan="2">{startingMember.batting_order}</td>
            <td width="300">{startingMember.player_name_kanji}</td>
            <td width="75" rowspan="2">{startingMember.uniform_number}</td>
            <td width="150" rowspan="2">{startingMember.position}</td>
            <td width="75" rowspan="2">{startingMember.BA}</td>
        </tr>
    </table>
  )
}

export default StartingMember;