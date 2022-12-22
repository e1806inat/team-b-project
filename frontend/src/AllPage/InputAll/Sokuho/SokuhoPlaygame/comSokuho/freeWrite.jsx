import './CSS/freewrite.css'

const updateFreeWrite = (e, setFreeWriteState) => {
    let value = e.target.value
    setFreeWriteState(value)
}

const changeFreeWriteMode = (freeWriteModeFlag, setFreeWriteModeFlag) => {
    setFreeWriteModeFlag(!freeWriteModeFlag)
}

export const freeWrite = (freeWriteState, setFreeWriteState, freeWriteModeFlag, setFreeWriteModeFlag) => {
    return (
        <div>
            <div className="freeWrite">
                {!freeWriteModeFlag &&
                    <input
                        className='freewriteInput'
                        value={freeWriteState}
                        onChange={(e) => { updateFreeWrite(e, setFreeWriteState) }}>
                    </input>
                }

            </div>
        </div>

    )
}