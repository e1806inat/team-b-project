import './CSS/runnerCount.css'

export const runnerCount = (runnerCountState, setRunnerCountState) => {

    return (
        <div>
            <div className="runnerCount">
                <i
                    className={"fa-solid fa-diamond diamond" + runnerCountState[0]}
                    onClick={() => setRunnerCountState([!runnerCountState[0], runnerCountState[1], runnerCountState[2]])}

                ></i>
                <i
                    className={"fa-solid fa-diamond diamond" + runnerCountState[1]}
                    onClick={() => setRunnerCountState([runnerCountState[0], !runnerCountState[1], runnerCountState[2]])}
                ></i>
                <i
                    className={"fa-solid fa-diamond diamond" + runnerCountState[2]}
                    onClick={() => setRunnerCountState([runnerCountState[0], runnerCountState[1], !runnerCountState[2]])}
                ></i>

            </div>
        </div>

    )
}

{/* <div>
<div className="runnerCount">
<i
        className={"fa-solid fa-diamond diamond" + runnerCountState[2]}
        onClick={() => setRunnerCountState([runnerCountState[0], runnerCountState[1], !runnerCountState[2]])}
    ></i>
    <i
        className={"fa-solid fa-diamond diamond" + runnerCountState[1]}
        onClick={() => setRunnerCountState([runnerCountState[0], !runnerCountState[1], runnerCountState[2]])}
    ></i>
                    <i
        className={"fa-solid fa-diamond diamond" + runnerCountState[0]}
        onClick={() => setRunnerCountState([!runnerCountState[0], runnerCountState[1], runnerCountState[2]])}
    ></i>

</div>
</div> */}