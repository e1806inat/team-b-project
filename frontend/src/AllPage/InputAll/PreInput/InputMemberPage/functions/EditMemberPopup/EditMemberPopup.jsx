import React from "react";
// import "./EditMemberPopup.css"



//メインのDOMの中で配置するサブ部品のような要素
class Popup extends React.Component {

    render() {
        return (
            <div className="popup_field">
                <div className="popup_inner_field">
                    <div className="title">{this.props.text}</div>

                    {/* 編集チェックボックス */}
                    <input
                        type="checkbox"
                        checked={this.props.EorDCheckbox}
                        onClick={() => {
                            this.props.setEorDCheckbox(true)
                            //初期値を入れる
                            this.props.setEditingMemberName(this.props.Tournament.tournament_name)
                        }}
                    ></input>大会を編集する<br></br>

                    名前の変更<br></br>
                    変更前：{this.props.member.player_name_kanji}{this.props.member.player_name_hira}<br></br>
                    変更後：<br />
                    氏（漢字）
                    <input
                        id="changeIdKanjiFamiry" value={this.props.editingMemberName.player_name_kanji.famiryName}
                        onChange={(e) => {
                            this.props.setEditingMemberName(
                                {
                                    player_name_kanji: e.target.value,
                                    player_name_hira: this.props.editingMemberName.player_name_hira
                                })
                        }}
                    ></input><br />

                    名（漢字）
                    <input
                        id="changeIdKanjiFirst" value={this.props.editingMemberName.player_name_kanji.firstName}
                        onChange={(e) => {
                            this.props.setEditingMemberName(
                                {
                                    player_name_kanji: {
                                        famiryName: this.props.editingMemberName.player_name_kanji.famiryName,
                                        firstName: e.target.value
                                    },
                                    player_name_hira: {
                                        famiryName: this.props.editingMemberName.player_name_hira.famiryName,
                                        firstName: this.props.editingMemberName.player_name_hira.firstName
                                    }
                                })
                        }}
                    ></input><br></br>

                    氏（ひらがな）
                    <input
                        id="changeId2" value={this.props.editingMemberName.player_name_hira.famiryName}
                        onChange={(e) => {
                            this.props.setEditingMemberName(
                                {
                                    player_name_kanji: this.props.editingMemberName.player_name_kanji,
                                    player_name_hira: e.target.value
                                }

                            )
                        }}
                    ></input>

                    名（ひらがな）
                    <input
                        id="changeIdHiraFirst" value={this.props.editingMemberName.player_name_hira.firstName}
                        onChange={(e) => {
                            this.props.setEditingMemberName(
                                {
                                    player_name_kanji: {
                                        famiryName: this.props.editingMemberName.player_name_kanji.famiryName,
                                        firstName: this.props.editingMemberName.player_name_kanji.firstName
                                    },
                                    player_name_hira: {
                                        famiryName: this.props.editingMemberName.player_name_hira.famiryName,
                                        firstName: this.props.editingMemberName.player_name_hira.firstName
                                    }
                                })
                        }}
                    ></input>

                    <br></br><br></br>
                    打ち方投げ方の変更:<br></br>
                    変更前：{this.props.member.handed_hit}打{this.props.member.handed_throw}投<br></br>
                    変更後：
                    <div>{this.props.selectHitted(this.props.handedHitState, this.props.handleHandedHit)}</div>
                    <div>{this.props.selectThrowed(this.props.handedThrowState, this.props.handleHandedThrow)}</div>

                    {/* 削除チェックボックス */}
                    <input
                        type="checkbox"
                        checked={!this.props.EorDCheckbox}
                        onClick={() => {
                            this.props.setEorDCheckbox(false)
                            //警告をを入れる
                            this.props.setEditingMemberName({ player_name_kanji: "大会を削除します", player_name_hira: "大会を削除します" })
                        }}
                    ></input>大会を削除する<br></br>

                    <p>情報が更新されますがよろしいでしょうか？</p>

                    {/* いいえのボタン */}
                    <button className="button_style"
                        onClick={() => {
                            this.props.closePopup()
                            this.props.setEorDCheckbox(true)
                        }}>いいえ</button>
                    <nbsp></nbsp>

                    {/* はいのボタン */}
                    <button className="button_style"
                        onClick={
                            () => {
                                if (this.props.EorDCheckbox) {
                                    //編集を確定する
                                    this.props.editTournament(
                                    )
                                }
                                else {
                                    //大会を削除する
                                    this.props.tournamentDelete(this.props.Tournament.tournament_id)
                                }

                                // 大会を読み込む
                                this.props.readTournament(this.props.setTournamentData)

                                // ポップアップを閉じる
                                this.props.closePopup()
                            }
                        }>はい</button>
                </div>
            </div>
        );
    }
}

//コンポーネントの内部に別のコンポーネントを持つことができる　ここではPopupというコンポ―ネントがある
class EditMemberPopup extends React.Component {
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
                <button
                    onClick={() => {
                        this.togglePopup()

                    }}
                    className={"InputMember" + this.props.selectedMember[this.props.ind]}
                >
                    <div className="selectName">
                        <div> &nbsp;&nbsp;{this.props.member.grade}年</div>
                        <div className="playerName">&nbsp;&nbsp;&nbsp;&nbsp;
                            {this.props.member.player_name_kanji}（ {this.props.member.player_name_hira}）</div>
                    </div>
                    {/* &nbsp; 背番号{member.uniform_number}  */}
                    <div className="Dominant">&nbsp;
                        {this.props.member.handed_hit}打 &nbsp;
                        {this.props.member.handed_throw}投 &nbsp;
                        背番号:{this.props.uniformNumberArray[this.props.ind]}</div>

                </button>
                {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
                {this.state.showPopup ? (
                    <Popup text="確認画面" closePopup={this.togglePopup}
                        member={this.props.member}
                        ind={this.props.ind}
                        EorDCheckbox={this.props.EorDCheckbox}
                        setEorDCheckbox={this.props.setEorDCheckbox}
                        editingMemberName={this.props.editingMemberName}
                        setEditingMemberName={this.props.setEditingMemberName}
                        selectHitted={this.props.selectHitted}
                        handedHitState={this.props.handedHitState}
                        handleHandedHit={this.props.handleHandedHit}
                        selectThrowed={this.props.selectThrowed}
                        handedThrowState={this.props.handedThrowState}
                        handleHandedThrow={this.props.handleHandedThrow}
                    />
                ) : null}
            </div>
        );
    }
}

//配置する部品の決まり文句
export default EditMemberPopup;