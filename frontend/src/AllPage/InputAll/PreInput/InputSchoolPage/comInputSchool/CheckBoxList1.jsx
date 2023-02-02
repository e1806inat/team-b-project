import React, { useState, useEffect } from "react"
//const { Schools } = require("../DB/Schools"); //分割代入

//checkboxコンポーネント
const CheckBox = ({ id, value, checked, onChange }) => {

    console.log("u")
    return (
        <input
            id={id}
            type="checkbox"
            name="inputNames"
            checked={checked}
            onChange={onChange}
            value={value}
        />
    )
}

export const CheckBoxList = (useSchools, setUseSchools) => {

    const handleChange = (ind) => {
        let copyCheck = useSchools.slice(0, useSchools.length);
        copyCheck[ind].IsCheck = !copyCheck[ind].IsCheck
        console.log(copyCheck)
        setUseSchools(copyCheck)
    }


    return (
        <>
            <form>
                <div className="schools">
                    {useSchools.map((school, ind) => {
                        return (
                            <div className="School" key={`key_${ind}`}>
                                {console.log(school.school)}
                                <CheckBox
                                    //出力の警告文は多分ここからきてる
                                    id={ind}
                                    value={school.school_name}
                                    onChange={() => handleChange(ind)}
                                    checked={school.IsCheck}
                                />

                                {school.school_name}
                            </div>
                        )
                    })}
                </div>

                {/* checkedがない場合には送信ボタンを表示させない */}
                {/* {<button >決定</button>} */}
            </form>

        </>
    )
}

export default CheckBoxList