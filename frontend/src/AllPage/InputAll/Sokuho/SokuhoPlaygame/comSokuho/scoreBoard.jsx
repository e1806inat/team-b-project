export const scoreBoard = (scoreState, nowIningState, urlSchoolName, urlSchoolName2) => {

    let teamAscore = 0
    let teamBscore = 0




    return (
        <div>
            <table className="scoreBoardTable" border="1">
                <tr className="scoreBoardTr" >
                    <th className="scoreBoardSchoolName"></th>
                    {scoreState[0].map((a, ind) =>
                        <th className="scoreBoardTh">{ind + 1}</th>
                    )}
                    <th className="scoreBoardSchoolName">計</th>
                </tr>
                <tr>
                    <td>{urlSchoolName}</td>
                    {scoreState[0].map((a, ind) => {
                        teamAscore = teamAscore + a;
                        if (nowIningState[1] === 0 && nowIningState[0] === ind) { return (<td className="nowIningScore">{a}</td>) }
                        else { return (<td>{a}</td>) }
                    }

                    )}
                    <td>{teamAscore}</td>
                </tr>
                <tr>
                    <td>{urlSchoolName2}</td>
                    {scoreState[1].map((a, ind) => {
                        teamBscore = teamBscore + a;
                        if (nowIningState[1] === 1 && nowIningState[0] === ind) { return (<td className="nowIningScore">{a}</td>) }
                        else { return (<td>{a}</td>) }
                    }

                    )}
                    <td>{teamBscore}</td>
                </tr>
            </table>
        </div>

    )
}
