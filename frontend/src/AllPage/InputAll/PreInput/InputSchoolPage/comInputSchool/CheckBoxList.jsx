// 使っていません






import React, { useState, useEffect } from "react"
//const { Schools } = require("../DB/Schools"); //分割代入

//checkboxコンポーネント
const CheckBox = ({ id, value, checked, onChange }) => {
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

export const CheckBoxList = (UseSchools, setUseSchools) => {
  console.log(UseSchools)
  //checkedItemsは初期値を空のオブジェクトにする
  const [checkedItems, setCheckedItems] = useState({})

  console.log(UseSchools)

  //ひとつでもcheckedになっている場合にのみ送信ボタンを表示させたいので、全体のStateを監視する
  const [isBtnHide, setIsBtnHide] = useState(true)

  useEffect(() => {
    //checkedItemsが空では無い場合、送信ボタンを表示させる
    Object.keys(checkedItems).length && setIsBtnHide(false)
    //すべてのcheckedItemの値がfalseの場合に送信ボタンを表示させる
    setTimeout(() => {
      if (
        Object.values(checkedItems).every(checkedItem => {
          return checkedItem === false
        })
      ) {
        setIsBtnHide(true)
      }
    }, 100);
  }, [checkedItems])

  const handleChange = e => {
    //checkedItemsのstateをセット
    setCheckedItems({
      ...checkedItems,
      [e.target.id]: e.target.checked
    })
  }

  const dataSendBtn = e => {
    //既定のイベントをキャンセルさせる
    e.preventDefault()
    //送信ボタンを押したタイミングで、checkedItemsオブジェクトのvalueがtrueのkeyのみを配列にしてconsoleに表示させる
    const dataPushArray = Object.entries(checkedItems).reduce((pre, [key, value]) => {
      value && pre.push(key)
      return pre
    }, [])
  }

  return (
    <>
      <h2>高校・チーム名選択</h2>
      <form>
        {UseSchools.map((school, ind) => {
          ind = ind + 1
          return (
            <div className="School" key={`key_${ind}`}>
              <CheckBox
                //出力の警告文は多分ここからきてる
                id={`id_${ind}`}
                value={school}
                onChange={handleChange}
                checked={checkedItems[school.IsCheck]}
              />
              {console.log(school.school_name)}
              {school.school_name}
            </div>
          )
        })}
        {/* checkedがない場合には送信ボタンを表示させない */}
        {!isBtnHide && <button onClick={dataSendBtn}>決定</button>}
      </form>

    </>
  )
}

export default CheckBoxList