import React, { useState } from 'react';

const Login = () => {
  //バックエンドのurlを取得
  const backendUrl = require("../../DB/communication").backendUrl;

  const initialValues = { loginID: "test", password: "123456789" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
    else if (values.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }
    else if (values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }
    return errors;
  };




  const handleLogin = () => {

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name: formValues.loginID, password: formValues.password }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data)

        if (data === "OK") {
          window.location.href = '/home'
        }
        window.location.href = '/home'
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
                <input type="text"
                  placeholder="パスワード"
                  name="password"
                  onChange={(e) => handleChande(e)}
                />
                <p className="errorMsg">{formErrors.password}</p>
              </div>
            </div>
            <button className="submitButton" onClick={handleLogin}>アカウント情報を送信</button>
            {Object.keys(formErrors).length === 0 && isSubmit && (
              <div className="MsgOk">照合中です</div>
            )}
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login;