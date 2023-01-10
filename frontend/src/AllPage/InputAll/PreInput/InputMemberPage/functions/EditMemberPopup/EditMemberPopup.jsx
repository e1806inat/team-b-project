import React from "react";
import "./EditMemberPopup.css"
import isEnpty from "../../../../../../Functions/IsEnpty";

const selectHitted = (handedHitState, handleHandedHit) => {
    if (handedHitState === "左") {
        return (
            <>
                <button style={{ color: "white", background: "lightskyblue" }}>左打</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("右")}>右打</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("両")}>両打</button>
            </>
        )
    }
    else if (handedHitState === "右") {
        return (
            <>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("左")}>左打</button>
                <button style={{ color: "white", background: "lightskyblue" }}>右打</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("両")}>両打</button>
            </>
        )
    }
    else if (handedHitState === "両") {
        return (
            <>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("左")}>左打</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedHit("右")}>右打</button>
                <button style={{ color: "white", background: "lightskyblue" }}>両打</button>
            </>
        )
    }
}

const selectThrowed = (handedThrowState, handleHandedThrow) => {
    if (handedThrowState === "左") {
        return (
            <>
                <button style={{ color: "white", background: "lightskyblue" }}>左投</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("右")}>右投</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("両")}>両投</button>
            </>
        )
    }
    else if (handedThrowState === "右") {
        return (
            <>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("左")}>左投</button>
                <button style={{ color: "white", background: "lightskyblue" }}>右打</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("両")}>両投</button>
            </>
        )
    }
    else if (handedThrowState === "両") {
        return (
            <>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("左")}>左投</button>
                <button style={{ color: "white", background: "mediumblue" }} onClick={() => handleHandedThrow("右")}>右投</button>
                <button style={{ color: "white", background: "lightskyblue" }}>両打</button>
            </>
        )
    }
}

//メインのDOMの中で配置するサブ部品のような要素
class Popup extends React.Component {

    render() {
        return (
            <div className="popup_field">
                <div className="popup_in_field3">
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

                        学年の変更<br />
                        変更前：{this.props.member.grade}<br />
                        変更後：{this.props.makePulldown(0, this.props.gradeArray, "grade", this.props.editGrade, this.props.setEditGrade)}<br />

                        名前の変更<br></br>
                        変更前：{this.props.member.player_name_kanji}{this.props.member.player_name_hira}<br></br>
                        変更後：<br />
                        氏（漢字）
                        <input
                            id="changeIdKanjiFamiry" value={this.props.editingMemberName.player_name_kanji.famiryName}
                            onChange={(e) => {
                                this.props.setEditingMemberName(
                                    {
                                        player_name_kanji: {
                                            famiryName: e.target.value,
                                            firstName: this.props.editingMemberName.player_name_kanji.firstName
                                        },
                                        player_name_hira: {
                                            famiryName: this.props.editingMemberName.player_name_hira.famiryName,
                                            firstName: this.props.editingMemberName.player_name_hira.firstName
                                        }
                                    }
                                )
                            }}
                        ></input>

                        氏（ひらがな）
                        <input
                            id="changeIdHiraFamiry" value={this.props.editingMemberName.player_name_hira.famiryName}
                            onChange={(e) => {
                                this.props.setEditingMemberName(
                                    {
                                        player_name_kanji: {
                                            famiryName: this.props.editingMemberName.player_name_kanji.famiryName,
                                            firstName: this.props.editingMemberName.player_name_kanji.firstName
                                        },
                                        player_name_hira: {
                                            famiryName: e.target.value,
                                            firstName: this.props.editingMemberName.player_name_hira.firstName
                                        }
                                    }
                                )
                            }}
                        ></input><br></br>

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
                                            firstName: e.target.value
                                        }
                                    }
                                )
                            }}
                        ></input>



                        <br></br><br></br>
                        打ち方投げ方の変更:<br></br>
                        変更前：{this.props.member.handed_hit}打{this.props.member.handed_throw}投<br></br>
                        変更後：
                        <div className='selectarea'>
                            <div className='battingarea'>{selectHitted(this.props.handedHitState, this.props.handleHandedHit)}</div>
                            <div className='throwarea'>{selectThrowed(this.props.handedThrowState, this.props.handleHandedThrow)}</div>
                        </div>

                        {/* 削除チェックボックス */}
                        <div className='delete_checkbox'>
                            <input
                                type="checkbox"
                                checked={!this.props.EorDCheckbox}
                                onClick={() => {
                                    this.props.setEorDCheckbox(false)
                                    //警告をを入れる
                                    // this.props.setEditingMemberName({ player_name_kanji: "大会を削除します", player_name_hira: "大会を削除します" })
                                }}
                            ></input>大会を削除する
                        </div>
                    </div>

                    <div className='buttonarea2'>
                        {/* いいえのボタン */}
                        <button className="button_style_3"
                            onClick={() => {
                                this.props.closePopup()
                                this.props.setEorDCheckbox(true)
                            }}>やめる</button>
                        <nbsp></nbsp>

                        {/* はいのボタン */}

                        {(isEnpty([
                            this.props.editingMemberName.player_name_kanji.famiryName,
                            this.props.editingMemberName.player_name_kanji.firstName,
                            this.props.editingMemberName.player_name_hira.famiryName,
                            this.props.editingMemberName.player_name_hira.firstName
                        ]) &&
                            this.props.isHiragana(this.props.editingMemberName.player_name_hira.famiryName) &&
                            this.props.isHiragana(this.props.editingMemberName.player_name_hira.firstName)
                        ) &&

                            <button className="button_style_3"
                                onClick={
                                    () => {
                                        if (this.props.EorDCheckbox) {
                                            //編集を確定する
                                            const sendInfo = {
                                                player_id: this.props.member.player_id,
                                                school_id: this.props.member.school_id,
                                                player_name_kanji:
                                                    this.props.editingMemberName.player_name_kanji.famiryName + "　" +
                                                    this.props.editingMemberName.player_name_kanji.firstName
                                                ,
                                                player_name_hira:
                                                    this.props.editingMemberName.player_name_hira.famiryName + "　" +
                                                    this.props.editingMemberName.player_name_hira.firstName
                                                ,
                                                grade: this.props.gradeArray[this.props.editGrade].grade,
                                                handed_hit: this.props.handedHitState,
                                                handed_throw: this.props.handedThrowState,
                                                BA: this.props.member.BA
                                            }
                                            this.props.EditMember(sendInfo)
                                        }
                                        else {
                                            //削除する
                                            const sendInfo = {
                                                player_id: this.props.member.player_id,
                                                school_id: this.props.member.school_id,
                                                player_name_kanji: null,
                                                player_name_hira: null,
                                                grade: null,
                                                handed_hit: null,
                                                handed_throw: null,
                                                BA: null
                                            }
                                            this.props.EditMember(sendInfo)
                                        }

                                        // 大会を読み込む
                                        // this.props.readTournament(this.props.setTournamentData)

                                        // ポップアップを閉じる
                                        this.props.closePopup()
                                    }
                                }>決定
                            </button>

                        }

                        {(!isEnpty([
                            this.props.editingMemberName.player_name_kanji.famiryName,
                            this.props.editingMemberName.player_name_kanji.firstName,
                            this.props.editingMemberName.player_name_hira.famiryName,
                            this.props.editingMemberName.player_name_hira.firstName
                        ]) ||
                            !this.props.isHiragana(this.props.editingMemberName.player_name_hira.famiryName) ||
                            !this.props.isHiragana(this.props.editingMemberName.player_name_hira.firstName)) &&
                            <button className="button_style_3">決定</button>
                        }
                    </div>


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
                        makePulldown={this.props.makePulldown}
                        editGrade={this.props.editGrade}
                        setEditGrade={this.props.setEditGrade}
                        EditMember={this.props.EditMember}
                        gradeArray={this.props.gradeArray}
                        isEnpty={this.props.isEnpty}
                        isHiragana={this.props.isHiragana}
                    />
                ) : null}
            </div>
        );
    }
}

//配置する部品の決まり文句
export default EditMemberPopup;