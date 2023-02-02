import React, { useState } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  // エラーメッセージ
  const errorMsgText = "ユーザ名またはパスワードが異なります"


  //ページ遷移用
  const navigate = useNavigate()
  const PageTransition = (url) => {
    navigate(url)
  }

  //バックエンドのurlを取得
  const backendUrl = require("../../DB/communication").backendUrl;

  //フロントの階層urlを表示
  const routeUrl = require("../../DB/communication").routeUrl;

  // const initialValues = { loginID: "test", password: "123456789" };
  const initialValues = { loginID: "", password: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();


  const handleChande = (e) => {
    //console.log(e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    //console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //ログイン情報を送信する
    //バリデーションチェック
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.loginID) {
      errors.loginID = "ログイン名を入力してください。";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください。";
    }
    else if (values.password.length < 8) {
      errors.password = "8文字以上20文字以下のパスワードを入力してください";
    }
    else if (values.password.length > 20) {
      errors.password = "8文字以上20文字以下のパスワードを入力してください";
    }
    return errors;
  };




  const handleLogin = () => {

    fetch(backendUrl + "/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name: formValues.loginID, password: formValues.password }),
    })
      .then((response) => response.json())
      .then((data) => {

        console.log(data[0])

        if (data[0]!==undefined && data[0].message === "そのユーザは存在しません") {
          if (formErrors.length === undefined) setFormErrors({ loginID: "", password: errorMsgText })
        }
        else if (data[0]!==undefined && data[0].message === "パスワードが異なります") {
          if (formErrors.length === undefined) setFormErrors({ loginID: "", password: errorMsgText })
        }
        else {
          console.log(data)
          setCookie("sessionID", data["session_id"])
          PageTransition(routeUrl + "/home")
        }

      })
  }



  return (
    <div>
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>ログイン</h1>

          <div className="uiform">
            <div className="form">
              <div className="formField">
                <input type="text"
                  placeholder="ログイン名"
                  name="loginID"
                  onChange={(e) => handleChande(e)}
                />
                <p className="errorMsg">{formErrors.loginID}</p>
              </div>
              <div className="formField">
                <input type="password"
                  placeholder="パスワード"
                  name="password"
                  onChange={(e) => handleChande(e)}
                />
                <p className="errorMsg">{formErrors.password}</p>
              </div>
            </div>
            <button className="submitButton" onClick={handleLogin}>アカウント情報を送信</button>
            {/* {Object.keys(formErrors).length === 0 && isSubmit && (
              <div className="MsgOk">照合中です</div>
            )} */}
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login;