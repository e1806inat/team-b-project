import React, { useState } from 'react';

const Login = () => {


  const initialValues = {loginID: "j846029b@mails.cc.ehime-u.ac.jp", password: "123456789"};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChande = (e) => {
    //console.log(e.target.value);
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
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

    if(!values.loginID){
      errors.loginID = "ログイン名を入力してください。";
    }
    if(!values.password){
      errors.password = "パスワードを入力してください。";
    }
    else if (values.password.length < 4){
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }
    else if (values.password.length > 15){
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }
    return errors;
  };



  const [login_id, setLogin_id] = useState("j846029b@mails.cc.ehime-u.ac.jp")
  const [login_ps, setLogin_ps] = useState("123456789")
  const handleId = (event) => {
    setLogin_id(event.target.value)
  }
  const handlePs = (event) => {
    setLogin_ps(event.target.value)
  }

  const syougou = (data) => {
    console.log(data.id)
    if (data.id === "OK"){
      window.location.href = '/home'
    }
  }


  

  const handleLogin = () => {

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({ email:login_id , password:login_ps }),
      //body: JSON.stringify({ email:login_id , password:login_ps }),
      body: JSON.stringify({ email:formValues.loginID , password:formValues.password }),
    })
      .then((response) => response.json())
      .then((data) => syougou(data))
  }

  const handleRegister = () => {

    fetch("http://localhost:5000/auth/user_register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:login_id , password:login_ps }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  return (
    <div>
      <h1>Login Page</h1>
      <h2 style={{ 'text-align': 'center' }}><img src={`${process.env.PUBLIC_URL}/ehime_paper_logo.png`} alt="Logo" /></h2>
      <h3 style={{ 'text-align': 'center' }}>
        ログインID
        <input
          onChange={(event) => handleId(event)}
          type={'text'}
          value={login_id}
        />

      </h3>
      <h4 style={{ 'text-align': 'center' }}>
        パスワード
        <input
          onChange={(event) => handlePs(event)}
          type={'text'}
          value={login_ps}
        />
        <button onClick={handleLogin}>
          Login
        </button>
        <button onClick={handleRegister}>
          登録
        </button>
      </h4>




      <div className="formContainer">
     <form onSubmit={(e) => handleSubmit(e)}>
      <h1>アカウント登録</h1>

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
          <div className="MsgOk">登録しました</div>
        )}
      </div>
     </form>
    </div>

    </div>
  )
}

export default Login;