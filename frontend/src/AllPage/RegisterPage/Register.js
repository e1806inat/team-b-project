import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';


function Register() {
  const initialValues = { loginID: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
      navigate(url)
    }

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

  const handleRegister = () => {

    fetch("http://localhost:5000/auth/user_register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name: formValues.loginID, password: formValues.password }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
  }


  return (
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
              <input type="password"
                placeholder="パスワード"
                name="password"
                onChange={(e) => handleChande(e)}
              />
              <p className="errorMsg">{formErrors.password}</p>
            </div>
          </div>
          <button className="submitButton" onClick={handleRegister}>アカウント情報を送信</button>
          {Object.keys(formErrors).length === 0 && isSubmit && (
            <div className="MsgOk">登録しました</div>
          )}
        </div>
        <div className='returnButton'><button onClick={()=> {PageTransition(-1)}}>HOMEにもどる</button></div>
      </form>
    </div>
  );
}


export default Register;
