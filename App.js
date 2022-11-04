import { useState } from 'react'; 
import './App.css';


function App() {
  const initialValues = {loginID: "", password: ""};
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
            <input type="text" 
              placeholder="パスワード" 
              name="password" 
              onChange={(e) => handleChande(e)}
            />
            <p className="errorMsg">{formErrors.password}</p>
          </div>
        </div>
        <button className="submitButton">アカウント情報を送信</button>
        {Object.keys(formErrors).length === 0 && isSubmit && (
          <div className="MsgOk">登録しました</div>
        )}
      </div>
     </form>
    </div>
  );
}


export default App;
