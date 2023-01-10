import React from "react";
// import "./EditMemberPopup.css"
import isEnpty from "../../../../../Functions/IsEnpty";


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
                            // this.props.setEditingMemberName(this.props.member.player_name_kanji)
                            console.log(this.props.editGrade)
                        }}
                    ></input>大会を編集する<br></br>

                    回戦の変更<br />
                    変更前：{this.props.member.grade}<br />
                    変更後：{this.props.makePulldown(0, this.props.gradeArray, "grade", this.props.editGrade, this.props.setEditGrade)}<br />

                    先攻の高校を変更
                    変更前：
                    変更後：

                    後攻の高校を変更
                    変更前：
                    変更後：


                    {/* 削除チェックボックス */}
                    <input
                        type="checkbox"
                        checked={!this.props.EorDCheckbox}
                        onClick={() => {
                            this.props.setEorDCheckbox(false)
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

                    {(true) &&

                        <button className="button_style"
                            onClick={() => {
                                this.props.closePopup()
                            }}>はい
                        </button>

                    }
                    {(false) &&

                        <button className="button_style"
                            onClick={() => {
                                this.props.closePopup()
                            }}>はい
                        </button>

                    }

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
                        背番号:{this.props.uniformNumberArray[this.props.ind]}
                    </div>

                </button>
                {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
                {this.state.showPopup ? (
                    <Popup text="確認画面" closePopup={this.togglePopup}
                        game={this.props.game}
                        ind={this.props.ind}
                        EorDCheckbox={this.props.EorDCheckbox}
                        setEorDCheckbox={this.props.setEorDCheckbox}
                        makePulldown={this.props.makePulldown}
                        isEnpty={this.props.isEnpty}
                    />
                ) : null}
            </div>
        );
    }
}

//配置する部品の決まり文句
export default EditMakegamePopup;