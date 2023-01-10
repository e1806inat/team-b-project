import React from "react";

//送られた文字列がどれか空ならtrue
const isEnpty = (strArray) => {
    let flag = false
    strArray.map((str) => {
        if (!str) {
            flag = true
        }
    })
    return flag
}

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
                            this.props.setEditingSchoolName(this.props.school.school_name)
                        }}
                    ></input>大会を編集する<br></br>

                    名前の変更<br></br>
                    変更前：{this.props.school.school_name}<br></br>
                    変更後：<input
                        id="changeId" value={this.props.editingTnmtName}
                        onChange={(e) => { this.props.setEditingSchoolName(e.target.value) }}
                    ></input><br></br><br></br>


                    {/* 削除チェックボックス */}
                    <input
                        type="checkbox"
                        checked={!this.props.EorDCheckbox}
                        onClick={() => {
                            this.props.setEorDCheckbox(false)
                            //警告をを入れる
                            this.props.setEditingSchoolName("大会を削除します")
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
                    {!isEnpty([this.props.editingSchoolName]) &&
                        <button className="button_style"
                            onClick={
                                () => {
                                    if (this.props.EorDCheckbox) {
                                        //編集を確定する
                                        this.props.EditSchool(
                                            this.props.school.school_id,
                                            document.getElementById("changeId").value,
                                            this.props.setUseSchools,
                                            this.props.urlTournamentId
                                        )
                                    }
                                    else {
                                        //高校を削除する
                                        this.props.DeleteSchool(
                                            this.props.school.school_id,
                                            this.props.school.school_name,
                                            this.props.setUseSchools,
                                            this.props.urlTournamentId,
                                        )
                                    }

                                    // 高校を読み込む
                                    this.props.readSchool(this.props.setUseSchools, this.props.urlTournamentId)

                                    // ポップアップを閉じる
                                    this.props.closePopup()
                                }
                            }>はい</button>
                    }

                    {isEnpty([this.props.editingSchoolName]) &&
                        <button className="button_style">はい
                        </button>
                    }
                </div>
            </div>
        );
    }
}

//コンポーネントの内部に別のコンポーネントを持つことができる　ここではPopupというコンポ―ネントがある
class EditSchoolPopup extends React.Component {
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
            <>
                <button
                    onClick={() => {
                        this.togglePopup()
                    }}>{this.props.school.school_name}</button>

                {/* this.state.PopupがtrueであればPopupウィンドウを開く */}
                {this.state.showPopup ? (
                    <Popup text="確認画面"
                        closePopup={this.togglePopup}
                        school={this.props.school}
                        EorDCheckbox={this.props.EorDCheckbox}
                        setEorDCheckbox={this.props.setEorDCheckbox}
                        EditSchool={this.props.EditSchool}
                        DeleteSchool={this.props.DeleteSchool}
                        readSchool={this.props.readSchool}
                        setUseSchools={this.props.setUseSchools}
                        urlTournamentId={this.props.urlTournamentId}
                        editingSchoolName={this.props.editingSchoolName}
                        setEditingSchoolName={this.props.setEditingSchoolName}
                    />
                ) : null}
            </>
        );
    }
}

//配置する部品の決まり文句
export default EditSchoolPopup;