import React from 'react'

const StartingMember = ({startingMember}) => {

  return (
    <table border="1" className='startingMembers'>
        <tr>
            <td width="8%" height="15vh" rowspan="2">{startingMember.batting_order}</td>
            <td width="30%"height="10vh" rowspan="2">{startingMember.player_name_kanji}</td>
            <td width="10%" height="10vh" rowspan="2">{startingMember.uniform_number}</td>
            <td className='position' width="18%" height="10vh" rowspan="2">{startingMember.position}</td>
            <td width="16%" height="10vh" rowspan="2">{startingMember.BA.toFixed(3).toString().substr(1,4)}</td>
        </tr>
    </table>
  )
}

export default StartingMember;