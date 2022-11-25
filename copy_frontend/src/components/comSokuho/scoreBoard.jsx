const { Score } = require("../../DB/Score")

export const scoreBoard = () => {
    console.log(Score)

    return (
                <div>
                    <table className="scoreBoardTable" border="1">
                        <tr className="scoreBoardTr" >
                            <th className="scoreBoardSchoolName"></th>
                            {Score[0].map((a, ind) =>
                                <th>{ind + 1}</th>
                            )}
                            <th>計</th>
                        </tr>
                        <tr>
                            <td>今治西</td>
                            {Score[0].map((a, ind) =>
                                <td>{a}</td>
                            )}
                            <td></td>
                        </tr>
                        <tr>
                            <td>西条</td>
                            {Score[1].map((a, ind) =>
                                <td>{a}</td>
                            )}
                            <td></td>
                        </tr>
                    </table>
                </div>

    )
}
