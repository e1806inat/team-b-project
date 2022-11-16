import './CSS/freewrite.css'

export const freeWrite = (freeWriteRef,freeWriteState) => {

    return (
        <div>
            <div className="freeWrite">
                <input ref={freeWriteRef} className='freewriteInput' value={freeWriteState}></input>
            </div>
        </div>

    )
}