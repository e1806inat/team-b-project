import './CSS/runnerCount.css'

export const runnerCount = (runnerCountState, setRunnerCountState) => {

    return (
        <div>
            <div className="runnerCount">
                <div className='runner'>ランナー</div>
                <span className='fa-stack fa-lg'>
                    <i
                        className={"fa-solid fa-diamond fa-stack-2x diamond" + runnerCountState[0]}
                        onClick={() => setRunnerCountState([!runnerCountState[0], runnerCountState[1], runnerCountState[2]])}
                    ></i>
                    <span 
                        className='fa fa-stack-1x'
                        onClick={() => setRunnerCountState([!runnerCountState[0], runnerCountState[1], runnerCountState[2]])}
                    >3塁</span>
                </span>

                <span className='fa-stack fa-lg'>
                    <i
                        className={"fa-solid fa-diamond fa-stack-2x diamond" + runnerCountState[1]}
                        onClick={() => setRunnerCountState([runnerCountState[0], !runnerCountState[1], !runnerCountState[2]])}
                    ></i>
                    <span 
                        className='fa fa-stack-1x'
                        onClick={() => setRunnerCountState([runnerCountState[0], !runnerCountState[1], runnerCountState[2]])}
                    >2塁</span>
                </span>

                <span className='fa-stack fa-lg'>
                    <i
                        className={"fa-solid fa-diamond fa-stack-2x diamond" + runnerCountState[2]}
                        onClick={() => setRunnerCountState([runnerCountState[0], runnerCountState[1], !runnerCountState[2]])}
                    ></i>
                    <span 
                        className='fa fa-stack-1x'
                        onClick={() => setRunnerCountState([runnerCountState[0], runnerCountState[1], !runnerCountState[2]])}
                    >1塁</span>
                </span>

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