import React, { useState } from 'react';

const Login = () => {
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
      body: JSON.stringify({ email:login_id , password:login_ps }),
    })
      .then((response) => response.json())
      .then((data) => syougou(data))
  }

  const handleRegister = () => {

    fetch("http://localhost:5000/auth/register", {
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

    </div>
  )
}

export default Login;