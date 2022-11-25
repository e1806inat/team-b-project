import { useRef, useState } from "react";
import { useParams } from "react-router-dom"



const TournamentNamber = () => {
    const { id } = useParams();
    const roundRef = useRef()
    const team1Ref = useRef()
    const team2Ref = useRef()
    const venueRef = useRef()
    const [matches, setMatches] = useState([[2, '伊予高校', '松山高校', '坊っちゃんスタジアム']])

    const handleMatch = () => {
        console.log(roundRef.current.value)
        let matches_ = [[roundRef.current.value, team1Ref.current.value, team2Ref.current.value, venueRef.current.value], ...matches]
        matches_.sort();
        matches_.reverse();
        setMatches(matches_);
        console.log(matches)
    }


    return (
        <div>{id}の記事です
            <div className="InputGame">
                回戦{<input type='text' ref={roundRef} />}
                <br />
                チーム1{<input type='text' ref={team1Ref} />}
                <br />
                チーム2{<input type='text' ref={team2Ref} />}
                <br />
                会場{<input type='text' ref={venueRef} />}
                <br />
                <button onClick={handleMatch}>追加</button>
            </div>
            <br />
            <hr></hr>
            <div className="matches">
                {matches.map(Match => (
                    <div className="match">
                        <div className="numRound">
                        </div>
                        <div className="aboutRound">
                            <button>
                                {Match[0]}回戦<br/>
                                {Match[1]}<br />
                                {Match[2]}<br />
                                {Match[3]}<br />
                            </button>
                            <br />
                            <br />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )


}
export default TournamentNamber;