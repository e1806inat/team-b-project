export const freeWrite = (freeWriteRef) => {

    return (
        <div>
            <div className="freeWrite">
                自由記述<input ref={freeWriteRef}></input>
            </div>
        </div>

    )
}