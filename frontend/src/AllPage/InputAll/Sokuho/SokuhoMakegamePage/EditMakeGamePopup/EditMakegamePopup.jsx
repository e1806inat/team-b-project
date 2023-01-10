import React from "react";
import "./EditMakeGamePopup.css"
import isEnpty from "../../../../../Functions/IsEnpty";


//メインのDOMの中で配置するサブ部品のような要素
class Popup extends React.Component {

    render() {
        return (
            <div className="popup_field">
                <div className="popup_in_field4">
                    <div className="title">{this.props.text}</div>
                    <div className='editarea'>
                        {/* 編集チェックボックス */}
                        <input
                            type="checkbox"
                            checked={this.props.EorDCheckbox}
                            onClick={() => {
                                this.props.setEorDCheckbox(true)
                                //初期値を入れる
                                // this.props.setEditingMemberName(this.props.member.player_name_kanji)
                                console.log(this.props.editGrade)
                            }}
                        ></input>大会を編集する<br></br>

                        変更前：{this.props.gameInfo.game_ymd}<br />
                        変更後：
                        年{this.props.makePulldown(0, this.props.YearList, "year", this.props.editingSelectedYmd, this.props.setEditingSelectedYmd)}
                        月{this.props.makePulldown(1, this.props.MonthList, "month", this.props.editingSelectedYmd, this.props.setEditingSelectedYmd)}
                        日{this.props.makePulldown(2, this.props.DayList, "day", this.props.editingSelectedYmd, this.props.setEditingSelectedYmd)}<br />

                        回戦の変更<br />
                        変更前：{this.props.gameInfo.match_num}<br />
                        変更後：{this.props.makePulldown(0, this.props.iningList, "ining", this.props.editingSelected, this.props.setEditingSelected)}<br />

                        先攻の高校を変更<br />
                        変更前：{this.props.gameInfo.school_name}<br />
                        変更後：{this.props.makePulldown(1, this.props.Schools, "school_name", this.props.editingSelected, this.props.setEditingSelected)}<br />

                        後攻の高校を変更<br />
                        変更前：{this.props.gameInfo.school_name_2}<br />
                        変更後：{this.props.makePulldown(2, this.props.Schools, "school_name", this.props.editingSelected, this.props.setEditingSelected)}<br />

                        会場を変更<br />
                        変更前：{this.props.gameInfo.venue_name}<br />
                        変更後：{this.props.makePulldown(3, this.props.Venues, "venue_name", this.props.editingSelected, this.props.setEditingSelected)}<br />


                        {/* 削除チェックボックス */}
                        <input
                            type="checkbox"
                            checked={!this.props.EorDCheckbox}
                            onClick={() => {
                                this.props.setEorDCheckbox(false)
                            }}
                        ></input>大会を削除する
                    </div>

                    <div className='buttonarea3'>
                        {/* いいえのボタン */}
                        <button className="button_style_3"
                            onClick={() => {
                                this.props.closePopup()
                                this.props.setEorDCheckbox(true)
                            }}>やめる</button>
                        <nbsp></nbsp>

                        {/* はいのボタン */}
                        {(true) &&
                            <button className="button_style_3"
                                onClick={() => {
                                    this.props.closePopup()

                                    if (this.props.EorDCheckbox) {

                                        let sendInfo = {
                                            game_id: this.props.gameInfo.game_id,
                                            tournament_id: this.props.gameInfo.tournament_id,
                                            school_id_1: this.props.Schools[this.props.editingSelected[1]].school_id,
                                            school_id_2: this.props.Schools[this.props.editingSelected[2]].school_id,
                                            venue_id: this.props.Venues[this.props.editingSelected[3]].venue_id,
                                            match_num: this.props.iningList[this.props.editingSelected[0]].ining,
                                            first_rear_1: this.props.gameInfo.first_rear_1,
                                            first_rear_2: this.props.gameInfo.first_rear_2,
                                            game_ymd: this.props.YearList[this.props.editingSelectedYmd[0]].year + "-" +
                                                this.props.MonthList[this.props.editingSelectedYmd[1]].month + "-" +
                                                this.props.DayList[this.props.editingSelectedYmd[2]].day,
                                            match_results: this.props.gameInfo.match_results
                                        }

                                        this.props.EditGame(sendInfo)

                                    }

                                    else {
                                        let sendInfo = {
                                            game_id: this.props.gameInfo.game_id,
                                            tournament_id: this.props.gameInfo.tournament_id
                                        }

                                        this.props.DeleteGame(sendInfo)

                                    }

                                    this.props.loadGame(this.props.setGameInfoState, this.props.urlTournamentId)

                                }}>決定
                            </button>

                        }
                        {(false) &&

                            <button className="button_style"
                                onClick={() => {
                                    this.props.closePopup()
                                }}>決定
                            </button>

                        }
                    </div>
                </div>
            </div>
        );
    }
}

//コンポーネントの内部に別のコンポーネントを持つことができる　ここではPopupというコンポ―ネントがある
class EditMakegamePopup extends React.Component {
    //初期設定の要素をconstructorに記述する
    //bind(this)をしないと呼び出し先のthisがundefinedになってしまう
    constructor(props, context) {
        super();
        this.state = { showPopup: false };
        this.togglePopup = this.togglePopup.bind(this);//重要
    }
    //togglePopupによってthis.state.showPopupの値を反転させる
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup,
        });
    }
    //renderの中に設置したいメインのDOM(部品）を記述していく
    render() {
        return (
            <div>
                {/* 表示項目 */}
                <button
                    onClick={() => {
                        this.togglePopup()

                    }}
                >

                    <div className="game">
                        <button className="btn_So_Make"
                            onClick={() => { }}>
                            {this.props.gameInfo.match_num}回戦<br />
                            {this.props.gameInfo.school_name}<br />
                            {this.props.gameInfo.school_name_2}<br />
                            {
                                this.props.Venues.length !== 0 &&
                                this.props.Venues[this.props.gameInfo.venue_id].venue_name
                            }
                        </button><br /><br />
                    </div>

                </button>

                {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
                {this.state.showPopup ? (
                    <Popup text="確認画面" closePopup={this.togglePopup}
                        gameInfo={this.props.gameInfo}
                        ind={this.props.ind}
                        EorDCheckbox={this.props.EorDCheckbox}
                        setEorDCheckbox={this.props.setEorDCheckbox}
                        makePulldown={this.props.makePulldown}
                        iningList={this.props.iningList}
                        Schools={this.props.Schools}
                        Venues={this.props.Venues}
                        YearList={this.props.YearList}
                        MonthList={this.props.MonthList}
                        DayList={this.props.DayList}
                        editingSelected={this.props.editingSelected}
                        setEditingSelected={this.props.setEditingSelected}
                        editingSelectedYmd={this.props.editingSelectedYmd}
                        setEditingSelectedYmd={this.props.setEditingSelectedYmd}
                        EditGame={this.props.EditGame}
                        DeleteGame={this.props.DeleteGame}
                        loadGame={this.props.loadGame}
                        setGameInfoState={this.props.setGameInfoState}
                        urlTournamentId={this.props.urlTournamentId}
                    />
                ) : null}
            </div>
        );
    }
}

//配置する部品の決まり文句
export default EditMakegamePopup;