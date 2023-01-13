import React from 'react'

const Daseki = ({ dasekiInfo }) => {

    // const handleTodoClick = () => {
    //     toggleTodo(todo.id);
    // };
    //var nowInning = '';
    console.log(dasekiInfo)

    var baseFlag = true;
    var outFlag = true;
    //var pinchFlag = true;
    var baseState = '';

    //進塁状況の把握
    if (dasekiInfo.base === '000') {
        baseFlag = false;
    } else {
        if (dasekiInfo.base === '001') {
            baseState = '１塁';
        } else if (dasekiInfo.base === '010') {
            baseState = '２塁'
        } else if (dasekiInfo.base === '011') {
            baseState = '２塁３塁'
        } else if (dasekiInfo.base === '100') {
            baseState = '３塁'
        } else if (dasekiInfo.base === '101') {
            baseState = '１塁３塁'
        } else if (dasekiInfo.base === '110') {
            baseState = '２塁３塁'
        } else if (dasekiInfo.base === '111') {
            baseState = '満塁'
        }
    }

    console.log(dasekiInfo['pinch']);

    if (dasekiInfo.outcount === 0) {
        outFlag = false;
    }

    //打席登録がパスされたら何も出力しない
    if (dasekiInfo.pass === 1) {
        return (
            <div></div>
        )
    } else {
        //n回表の出力
        if (dasekiInfo.inning % 10 === 1) {
            if (dasekiInfo.inning !== null) {
                return (
                    <div className="daseki">
                        <div>【{Math.floor(dasekiInfo.inning / 10)}回表】</div>
                        <span>{dasekiInfo.batting_order}番</span>
                        <span>　</span>
                        <span>{dasekiInfo.player_name_kanji}</span>
                        <span>　</span>
                        <span>{dasekiInfo.text_inf}</span>
                        {outFlag && <span>　</span>}
                        {outFlag && <span>{dasekiInfo.outcount}アウト</span>}
                        {baseFlag && <span>　</span>}
                        {baseFlag && <span>{baseState}</span>}
                        {dasekiInfo.pinch !== null && <span>　</span>}
                        {dasekiInfo.pinch !== null && <span>{dasekiInfo.pinch}</span>}
                    </div>
                )
            } else {
                return (
                    <div className="daseki">
                        <span>{dasekiInfo.batting_order}番</span>
                        <span>　</span>
                        <span>{dasekiInfo.player_name_kanji}</span>
                        <span>　</span>
                        <span>{dasekiInfo.text_inf}</span>
                        {outFlag && <span>　</span>}
                        {outFlag && <span>{dasekiInfo.outcount}アウト</span>}
                        {baseFlag && <span>　</span>}
                        {baseFlag && <span>{baseState}</span>}
                        {dasekiInfo.pinch !== null && <span>　</span>}
                        {dasekiInfo.pinch !== null && <span>{dasekiInfo.pinch}</span>}
                    </div>
                )
            }
        } else {
             //n回裏の出力
            if (dasekiInfo.inning !== null) {
                return (
                    <div className="daseki">
                        <div>【{Math.floor(dasekiInfo.inning / 10)}回裏】</div>
                        <span>{dasekiInfo.batting_order}番</span>
                        <span>　</span>
                        <span>{dasekiInfo.player_name_kanji}</span>
                        <span>　</span>
                        <span>{dasekiInfo.text_inf}</span>
                        {outFlag && <span>　</span>}
                        {outFlag && <span>{dasekiInfo.outcount}アウト</span>}
                        {baseFlag && <span>　</span>}
                        {baseFlag && <span>{baseState}</span>}
                        {dasekiInfo.pinch !== null && <span>　</span>}
                        {dasekiInfo.pinch !== null && <span>{dasekiInfo.pinch}</span>}
                    </div>
                )
            } else {
                return (
                    <div className="daseki">
                        <span>{dasekiInfo.batting_order}番</span>
                        <span>　</span>
                        <span>{dasekiInfo.player_name_kanji}</span>
                        <span>　</span>
                        <span>{dasekiInfo.text_inf}</span>
                        {outFlag && <span>　</span>}
                        {outFlag && <span>{dasekiInfo.outcount}アウト</span>}
                        {baseFlag && <span>　</span>}
                        {baseFlag && <span>{baseState}</span>}
                        {dasekiInfo.pinch !== null && <span>　</span>}
                        {dasekiInfo.pinch !== null && <span>{dasekiInfo.pinch}</span>}
                    </div>
                )
            }
        }
    }
}

export default Daseki;